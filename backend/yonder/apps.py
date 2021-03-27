from django.apps import AppConfig


class YonderConfig(AppConfig):
    name = 'yonder'

    def ready(self):
        import yonder.signals
