import { createProxyMiddleware } from 'http-proxy-middleware';


export default function setupProxy(app) {
  app.use(
    '/api', // 프록시를 적용할 경로를 설정합니다. 이 경로를 통해 API 요청을 보냅니다.
    createProxyMiddleware({
      target: 'http://j9b206.p.ssafy.io:8080', // 백엔드 서버의 주소를 입력합니다.
      changeOrigin: true,
    })
  );
}