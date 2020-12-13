# HTTP/1.1 vs HTTP/2

## HTTP.  What is it?

   The **Hypertext Transfer Protocol** (HTTP) is an application layer protocol for data communication on the World Wide Web, where hypertext documents include hyperlinks to other resources that the user can easily access. There have been four versions of HTTP since its introduction.


## HTTP/2

   HTTP/2 is the first upgrade to the Hypertext Transfer Protocol since 1999. Its goal is to improve website performance by optimizing how HTTP is expressed “on-the-wire.” It doesn’t change the semantics of HTTP, which means header fields, status codes, and cookies work exactly the same way as in HTTP/1.1.

HTTP/2 began its life as Google’s SPDY protocol, which they designed to address many of the performance problems inherent in HTTP/1.1. The core benefits of SPDY have made their way into HTTP/2, improved by the global Internet community, and formalized into an Internet Standard

## Advantages of HTTP/2 over HTTP/1.1

   HTTP announced many new features to improve the speed of page load times.

### Multiplexing

- Multiplexing allows a browser to include multiple requests in a single TCP connection.
- The problem is, a browser can only have a limited number of TCP connections open at any given time. For HTTP/1.1, this means a browser can only load a single resource at a time—every asset in a web page is sent back to the browser sequentially.
- Multiplexing allows a browser to request all these assets in parallel. This results in a dramatic performance gain.

### Header Compression

- Modern websites rely on a lot of external assets: images, CSS, JavaScript, and fonts, just to name a few. Each time a browser requests one of these assets, it includes an HTTP header with the request. When the server sends the asset back to the browser, it also includes an HTTP response header. That’s a lot of overhead for the typical web page.
- HTTP/2 forces all HTTP headers to be sent in a compressed format, reducing the amount of information that needs to be exchanged between browser and server. HTTP/1.1 does not provide any form of header compression.

### Server Push

- HTTP/2 Server Push allows an HTTP/2-compliant server to send resources to an HTTP/2-compliant client before the client requests them. It is, for the most part, a performance technique that can be helpful in loading resources preemptively.
- For example, when a browser requests an HTML page, you can “push” all the CSS stylesheets, image resources, and other assets inside that web page. After the browser parses the HTML and finds all those assets, they’ll already be loaded into the local browser cache. This avoids extra requests back to the server.

### Stream Priority

- Stream priority is a mechanism for browsers to specify which assets they would like to receive first. For example, an HTTP/2-aware browser can use stream priority to load the HTML for a page first, followed by CSS, then JavaScript, and finally image assets. This order allows the browser to render the page as quickly as possible.
- You can think of stream priority as an optimization on top of multiplexing. Multiplexing lets you send several requests in a single TCP connection, and stream priority lets you define the order of the responses. While multiplexing eliminates much of the TCP overhead, it does nothing to optimize transfer times from the server to the browser. This is what stream priority is for.
