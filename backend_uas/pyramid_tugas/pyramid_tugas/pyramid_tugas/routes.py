def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    config.add_route('subjects', '/api/subjects')
    config.add_route('subject', '/api/subjects/{id}')
    config.add_route('tasks', '/api/tasks')
    config.add_route('task', '/api/tasks/{id}')