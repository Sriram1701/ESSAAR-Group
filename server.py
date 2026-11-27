import http.server
import socket
import os
import urllib.parse

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_HEAD(self):
        if not self._handle_routing(head_only=True):
            super().do_HEAD()

    def do_GET(self):
        if not self._handle_routing(head_only=False):
            super().do_GET()

    def _handle_routing(self, head_only=False):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query = parsed.query
        q_str = f"?{query}" if query else ""

        # 1. Permanent redirect (301) for /index.html and /index to clean root /
        if path in ('/index.html', '/index'):
            self._send_redirect('/' + q_str, 301)
            return True

        # 2. Permanent redirect (301) for any *.html URL to clean URL (e.g. /about.html -> /about)
        if path.endswith('.html'):
            clean = path[:-5]
            self._send_redirect(clean + q_str, 301)
            return True

        # 3. Strip trailing slash from page paths (e.g. /about/ -> /about)
        if path != '/' and path.endswith('/'):
            stripped = path.rstrip('/')
            candidate = os.path.join(DIRECTORY, stripped.lstrip('/') + '.html')
            if os.path.isfile(candidate):
                self._send_redirect(stripped + q_str, 301)
                return True

        # 4. Check if clean URL matches an existing .html page on disk
        if path != '/':
            clean_name = path.lstrip('/')
            candidate = os.path.join(DIRECTORY, clean_name + '.html')
            if os.path.isfile(candidate):
                self._serve_file(candidate, 'text/html; charset=utf-8', status=200, head_only=head_only)
                return True

        # 5. Check if requested path is a real file or root directory
        local_path = os.path.join(DIRECTORY, path.lstrip('/'))
        if path == '/' or os.path.exists(local_path):
            return False  # Let super().do_GET() handle root / and static assets

        # 6. For non-existent routes, serve 404.html with status 404
        custom_404 = os.path.join(DIRECTORY, '404.html')
        if os.path.isfile(custom_404):
            self._serve_file(custom_404, 'text/html; charset=utf-8', status=404, head_only=head_only)
            return True

        return False

    def _send_redirect(self, target, code=301):
        self.send_response(code)
        self.send_header('Location', target)
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.end_headers()

    def _serve_file(self, filepath, content_type, status=200, head_only=False):
        try:
            with open(filepath, 'rb') as f:
                content = f.read()
            self.send_response(status)
            self.send_header('Content-Type', content_type)
            self.send_header('Content-Length', str(len(content)))
            self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Expires', '0')
            self.end_headers()
            if not head_only:
                self.wfile.write(content)
        except Exception as e:
            self.send_error(500, str(e))

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('10.255.255.255', 1))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP

if __name__ == '__main__':
    local_ip = get_local_ip()
    with http.server.ThreadingHTTPServer(("", PORT), CleanURLHandler) as httpd:
        print(f"=====================================================")
        print(f"  ESSAAR GROUP CLEAN-URL WEB SERVER ACTIVE")
        print(f"  Local Access:   http://localhost:{PORT}")
        print(f"  Network/Mobile: http://{local_ip}:{PORT}")
        print(f"=====================================================")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            httpd.server_close()
