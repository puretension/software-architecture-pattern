# Express Module Pattern

이 프로젝트는 NestJS의 모듈형 구조와 규칙을 Express 기반에서 구현한 레퍼런스 아키텍처입니다.

## 🌲 디렉토리 구조

```text
src
├── Admin       // 관리자 관련 기능
├── App         // 앱 초기화 및 라우트 등록 (NestJS의 App.module 역할)
│   └── index.ts
├── Common      // 전역 공통 로직
│   ├── Exception // 전역 에러 핸들링
│   ├── Interceptor
│   ├── Middleware
│   └── Security
├── Module      // 도메인별 모듈 (NestJS 모듈 단위)
│   ├── User
│   └── Product
│       ├── Constant
│       ├── Controller // 라우트 정의와 비즈니스 핸들러 분리
│       ├── Dto
│       ├── Emitter    // 이벤트 기반 로직 (Emitter 패턴)
│       ├── Exception
│       ├── Schema
│       ├── Service    // 비즈니스 로직 (Object 반환 원칙)
│       ├── Type
│       └── Util
├── ThirdParty  // 외부 서비스 연동 (AWS, Google 등)
└── Util        // 도메인 독립적인 유틸리티
```

## 🛠 주요 규칙 및 구현 예시

### 1. Controller: API 경로와 비즈니스 로직 분리
라우트 정의(Express Router)와 실제 로직을 수행하는 private 메서드를 명확히 분리합니다.

```typescript
// src/Module/Product/Controller/product.controller.ts
private initRoutes() {
    this.router.get('/', this._getProducts.bind(this));
}

/** API 요청 경로를 정의하는 부분 */
private async _getProducts(req: Request, res: Response, next: NextFunction) {
    const result = await this.getProducts(); // 비즈니스 로직 호출
    res.json(result);
}

/** 비즈니스 로직을 담당하는 부분 */
private async getProducts() {
    return await productService.findAll();
}
```

### 2. Service: 반환값의 Object 형태 유지
확장성을 위해 항상 객체 형태로 결과를 반환합니다.

```typescript
// ✅ Good: 나중에 필드 추가가 용이함
async getProducts(): Promise<{ products: Product[] }> {
    return { products: this.products };
}
```

### 3. Emitter 패턴 사용
부수 효과(Side effects)를 기본 서비스 로직에서 분리하여 결합도를 낮춥니다. (src/Module/Product/Emitter/product.emitter.ts 참고)

### 4. Zod를 이용한 DTO 검증
런타임 타입 안전성을 확보하기 위해 Zod를 사용하여 요청 데이터를 검증합니다.

```typescript
// src/Module/Product/Dto/product.dto.ts
export const CreateProductDto = z.object({
  name: z.string().min(3),
  price: z.number().positive(),
});
```

## 🚀 실행 및 레시피

### 패키지 매니저
이 프로젝트는 `yarn`을 사용합니다.

```bash
yarn install
yarn dev      # 개발 서버 실행
yarn debug    # 디버깅 모드 (VS Code "Debug Express" 프로파일 사용 가능)
```

### 디버깅 방법
1. `.vscode/launch.json`에 이미 설정이 포함되어 있습니다.
2. `yarn debug` 명령어로 서버를 실행합니다.
3. VS Code의 "Run and Debug" 탭에서 **Debug Express**를 실행하면 브레이크포인트를 걸고 디버깅할 수 있습니다.

## 🧪 실습 가이드 (API 테스트)

아래 curl 명령어를 통해 3-tier 계층 간의 데이터 흐름과 비즈니스 로직(Emitter, Validation)을 체험해볼 수 있습니다.

### 1. 상품 생성 (Validation & Emitter 체험)
Zod 검증과 Emitter 패턴이 작동하는 것을 확인합니다.

```bash
curl -X POST http://localhost:3000/products \
     -H "Content-Type: application/json" \
     -d '{
       "name": "아이폰 16 Pro",
       "price": 1550000,
       "stock": 50
     }'
```

### 2. 상품 목록 조회 (Object Return 체험)
데이터가 배열이 아닌 `{ products: [...] }` 객체 형태로 반환되어 확장성이 확보된 것을 확인합니다.

```bash
curl http://localhost:3000/products
```

### 3. 상태 변경 (Business Logic & Status Change 체험)
Service 계층에서 이전 상태(oldStatus)를 기억하고 Emitter를 통해 이벤트를 전송하는 로직을 확인합니다.

```bash
# {id} 부분에 실제 생성된 상품 ID를 넣으세요
curl -X PATCH http://localhost:3000/products/{id} \
     -H "Content-Type: application/json" \
     -d '{ "status": "ACTIVE" }'
```
