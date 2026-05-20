#!/usr/bin/env python
"""
Backend startup script for AICountant.
Run this script to start the FastAPI backend server.
"""
import sys
import os

# Change to the root project directory
project_root = os.path.dirname(os.path.abspath(__file__))
os.chdir(project_root)

# Add backend to path
sys.path.insert(0, os.path.join(project_root, 'backend'))

import uvicorn

if __name__ == '__main__':
    host = os.getenv('APP_HOST', '0.0.0.0')
    port = int(os.getenv('APP_PORT', '8000'))
    reload = os.getenv('RELOAD', 'true').lower() in ('1', 'true', 'yes')

    print("🚀 Starting AICountant Backend Server...")
    print(f"📍 API available at: http://{host}:{port}")
    print("📚 API Docs: http://127.0.0.1:8000/docs")
    print("\nPress Ctrl+C to stop the server.\n")
    uvicorn.run('backend.main:app', host=host, port=port, reload=reload)

