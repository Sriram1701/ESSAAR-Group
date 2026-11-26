import http.server
import socket
import os

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Force hard refresh / disable all browser caching
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
    # Multi-threaded server handles concurrent asset loading smoothly
    with http.server.ThreadingHTTPServer(("", PORT), NoCacheHTTPRequestHandler) as httpd:
        print(f"=====================================================")
        print(f"  ESSAAR GROUP MULTI-THREADED WEB SERVER ACTIVE")
        print(f"  Local Access:   http://localhost:{PORT}")
        print(f"  Network/Mobile: http://{local_ip}:{PORT}")
        print(f"=====================================================")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            httpd.server_close()
