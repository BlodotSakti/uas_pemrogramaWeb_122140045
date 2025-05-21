import pytest
from pyramid import testing
from ..models import Subject, Task
from datetime import date

@pytest.fixture
def dummy_request(dbsession):
    req = testing.DummyRequest(dbsession=dbsession)
    return req

def test_create_subject(dummy_request):
    from ..views.api import create_subject
    dummy_request.json_body = {'kode': 'IF101', 'name': 'Algoritma', 'dosen': 'Budi'}
    resp = create_subject(dummy_request)
    assert resp['name'] == 'Algoritma'
    assert resp['kode'] == 'IF101'

def test_create_task(dummy_request):
    from ..views.api import create_task
    subj = Subject(kode='IF101', name='Algoritma', dosen='Budi')
    dummy_request.dbsession.add(subj)
    dummy_request.dbsession.flush()
    dummy_request.json_body = {
        'title': 'Tugas 1',
        'matkul_id': subj.id,
        'tenggat': '2024-06-01',
        'status': 'belum'
    }
    resp = create_task(dummy_request)
    assert resp['title'] == 'Tugas 1'
    assert resp['matkul_id'] == subj.id
    assert resp['status'] == 'belum'


# ...unit test di atas...

from webtest import TestApp
from .. import main

def test_subjects_api_integration():
    app = main({}, **{'sqlalchemy.url': 'sqlite:///:memory:'})
    testapp = TestApp(app)
    # Tambah subject
    res = testapp.post_json('/api/subjects', {
        'kode': 'IF202',
        'name': 'Struktur Data',
        'dosen': 'Siti'
    }, status=200)
    assert res.json['name'] == 'Struktur Data'
    # Ambil list subject
    res = testapp.get('/api/subjects')
    assert any(s['name'] == 'Struktur Data' for s in res.json)