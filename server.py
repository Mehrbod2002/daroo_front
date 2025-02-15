from http.server import SimpleHTTPRequestHandler, HTTPServer
import os, time

class CustomHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        time.sleep(5)
        if self.path == "/" or os.path.isdir(self.translate_path(self.path)):
            self.path = "/main-index.html"
        super().do_GET()

PORT = 4000
DIRECTORY = "/root/daroo_front/demo"

os.chdir(DIRECTORY)

httpd = HTTPServer(("0.0.0.0", PORT), CustomHandler)
httpd.serve_forever()
