from pyramid.view import view_config
from pyramid.httpexceptions import HTTPNotFound, HTTPBadRequest
from ..models import Task, Subject
from datetime import datetime
from pyramid.response import Response

# OPTIONS handler for CORS preflight
@view_config(route_name='subjects', request_method='OPTIONS')
@view_config(route_name='subject', request_method='OPTIONS')
@view_config(route_name='tasks', request_method='OPTIONS')
@view_config(route_name='task', request_method='OPTIONS')
def options_view(request):
    return Response()

# SUBJECT CRUD

@view_config(route_name='subjects', renderer='json', request_method='GET')
def get_subjects(request):
    subjects = request.dbsession.query(Subject).all()
    return [{'id': s.id, 'kode': s.kode, 'name': s.name, 'dosen': s.dosen} for s in subjects]

@view_config(route_name='subjects', renderer='json', request_method='POST')
def create_subject(request):
    data = request.json_body
    if not all(k in data for k in ('kode', 'name', 'dosen')):
        return HTTPBadRequest(json_body={'error': 'Field kode, name, dosen wajib diisi'})
    subject = Subject(
        kode=data['kode'],
        name=data['name'],
        dosen=data['dosen']
    )
    request.dbsession.add(subject)
    request.dbsession.flush()
    return {'id': subject.id, 'kode': subject.kode, 'name': subject.name, 'dosen': subject.dosen}

@view_config(route_name='subject', renderer='json', request_method='GET')
def get_subject(request):
    subject_id = int(request.matchdict['id'])
    subject = request.dbsession.query(Subject).get(subject_id)
    if not subject:
        return HTTPNotFound(json_body={'error': 'Subject not found'})
    return {
        'id': subject.id,
        'kode': subject.kode,
        'name': subject.name,
        'dosen': subject.dosen
    }

@view_config(route_name='subject', renderer='json', request_method='PUT')
def update_subject(request):
    subject = request.dbsession.query(Subject).get(int(request.matchdict['id']))
    if not subject:
        return HTTPNotFound()
    data = request.json_body
    subject.kode = data.get('kode', subject.kode)
    subject.name = data.get('name', subject.name)
    subject.dosen = data.get('dosen', subject.dosen)
    return {'id': subject.id, 'kode': subject.kode, 'name': subject.name, 'dosen': subject.dosen}

@view_config(route_name='subject', renderer='json', request_method='DELETE')
def delete_subject(request):
    subject = request.dbsession.query(Subject).get(int(request.matchdict['id']))
    if not subject:
        return HTTPNotFound()
    request.dbsession.delete(subject)
    return {'status': 'deleted'}

# TASK CRUD

@view_config(route_name='tasks', renderer='json', request_method='GET')
def get_tasks(request):
    tasks = request.dbsession.query(Task).all()
    return [{
        'id': t.id,
        'title': t.title,
        'matkul_id': t.matkul_id,
        'matkul': t.matkul.name if t.matkul else None,
        'tenggat': t.tenggat.isoformat() if t.tenggat else None,
        'status': t.status
    } for t in tasks]

@view_config(route_name='tasks', renderer='json', request_method='POST')
def create_task(request):
    data = request.json_body
    if not all(k in data for k in ('title', 'matkul_id', 'tenggat', 'status')):
        return HTTPBadRequest(json_body={'error': 'Field title, matkul_id, tenggat, status wajib diisi'})
    subject = request.dbsession.query(Subject).get(data['matkul_id'])
    if not subject:
        return HTTPBadRequest(json_body={'error': 'Subject not found'})
    try:
        task = Task(
            title=data['title'],
            matkul_id=data['matkul_id'],
            tenggat=datetime.strptime(data['tenggat'], '%Y-%m-%d').date(),
            status=data['status']
        )
        request.dbsession.add(task)
        request.dbsession.flush()
        return {
            'id': task.id,
            'title': task.title,
            'matkul_id': task.matkul_id,
            'matkul': subject.name,
            'tenggat': task.tenggat.isoformat(),
            'status': task.status
        }
    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})

@view_config(route_name='tasks', renderer='json', request_method='DELETE')
def delete_all_tasks(request):
    # Optional: implement if you want to delete all tasks
    return HTTPBadRequest(json_body={'error': 'Not implemented'})

@view_config(route_name='task', renderer='json', request_method='GET')
def get_task(request):
    task_id = int(request.matchdict['id'])
    task = request.dbsession.query(Task).get(task_id)
    if not task:
        return HTTPNotFound(json_body={'error': 'Task not found'})
    subject = request.dbsession.query(Subject).get(task.matkul_id)
    return {
        'id': task.id,
        'title': task.title,
        'matkul_id': task.matkul_id,
        'matkul': subject.name if subject else None,
        'tenggat': task.tenggat.isoformat() if task.tenggat else None,
        'status': task.status
    }

@view_config(route_name='task', renderer='json', request_method='PUT')
def update_task(request):
    task = request.dbsession.query(Task).get(int(request.matchdict['id']))
    if not task:
        return HTTPNotFound()
    data = request.json_body
    task.title = data.get('title', task.title)
    task.matkul_id = data.get('matkul_id', task.matkul_id)
    if 'tenggat' in data:
        task.tenggat = datetime.strptime(data['tenggat'], '%Y-%m-%d').date()
    task.status = data.get('status', task.status)
    subject = request.dbsession.query(Subject).get(task.matkul_id)
    return {
        'id': task.id,
        'title': task.title,
        'matkul_id': task.matkul_id,
        'matkul': subject.name if subject else None,
        'tenggat': task.tenggat.isoformat() if task.tenggat else None,
        'status': task.status
    }

@view_config(route_name='task', renderer='json', request_method='DELETE')
def delete_task(request):
    task = request.dbsession.query(Task).get(int(request.matchdict['id']))
    if not task:
        return HTTPNotFound()
    request.dbsession.delete(task)
    return {'status': 'deleted'}

def includeme(config):
    pass