"""
WSGI config for comsci_site project.

It exposes the WSGI callable as a module-level variable named `application`.
Also exposes `app` for Vercel Serverless deployment.
"""

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "comsci_site.settings")

application = get_wsgi_application()

# Alias for Vercel deployment
app = application
