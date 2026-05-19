import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PostDTO } from '../Models/post.dto';
import { PostService } from './post.service';

/**
 * En este fichero probamos el servicio PostService.
 * En lugar de HttpClientTestingModule (deprecado),
 * usamos la nueva API basada en providers:
 *
 *   - provideHttpClient()
 *   - provideHttpClientTesting()
 */

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Nueva forma recomendada de configurar HttpClient en tests
      providers: [
        provideHttpClient(), // HttpClient "normal"
        provideHttpClientTesting(), // Backend de pruebas + HttpTestingController
        PostService,
      ],
    });

    // Obtenemos las dependencias desde el inyector de TestBed
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no quedan peticiones pendientes sin manejar
    httpMock.verify();
  });

  it('debería crear la instancia del servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener todos los posts con GET /posts', () => {
    // Arrange
    const mockPosts: PostDTO[] = [
      new PostDTO('Post 1', 'Desc 1', 0, 0, new Date()),
      new PostDTO('Post 2', 'Desc 2', 0, 0, new Date()),
    ];

    let response: PostDTO[] | undefined;

    // Act: llamamos al servicio y nos suscribimos
    service.getPosts().subscribe((res) => (response = res));

    /**
     * HttpTestingController intercepta la petición realizada por HttpClient.
     * expectOne comprueba que se ha hecho UNA petición a la URL indicada
     * y nos devuelve un objeto "req" que representa esa petición.
     */
    const req = httpMock.expectOne('http://localhost:3000/posts');

    // Comprobamos que el método HTTP es el esperado
    expect(req.request.method).toBe('GET');

    // Simulamos la respuesta de la API (como si el servidor devolviera estos datos)
    req.flush(mockPosts);

    // Assert: la respuesta del observable debe ser el array simulado
    expect(response).toEqual(mockPosts);
  });

  it('debería obtener los posts de un usuario con GET /users/posts/{userId}', () => {
    // Arrange
    const mockPosts: PostDTO[] = [
      new PostDTO('Post 1', 'Desc 1', 0, 0, new Date()),
    ];

    let response: PostDTO[] | undefined;

    // Act
    service.getPostsByUserId('user-1').subscribe((res) => (response = res));

    const req = httpMock.expectOne('http://localhost:3000/users/posts/user-1');
    expect(req.request.method).toBe('GET');

    req.flush(mockPosts);

    // Assert
    expect(response).toEqual(mockPosts);
  });

  it('debería crear un post con POST /posts', () => {
    // Arrange
    const newPost = new PostDTO('Nuevo', 'Descripción', 0, 0, new Date());

    let response: PostDTO | undefined;

    // Act
    service.createPost(newPost).subscribe((res) => (response = res));

    const req = httpMock.expectOne('http://localhost:3000/posts');

    // Comprobamos el método HTTP
    expect(req.request.method).toBe('POST');

    // Simulamos respuesta de la API
    req.flush(newPost);

    // Assert
    expect(response).toEqual(newPost);
  });

  it('debería obtener un post por id con GET /posts/{id}', () => {
    // Arrange
    const mockPost = new PostDTO('Post 1', 'Desc 1', 0, 0, new Date());

    let response: PostDTO | undefined;

    // Act
    service.getPostById('post-1').subscribe((res) => (response = res));

    const req = httpMock.expectOne('http://localhost:3000/posts/post-1');
    expect(req.request.method).toBe('GET');

    req.flush(mockPost);

    // Assert
    expect(response).toEqual(mockPost);
  });

  it('debería actualizar un post con PUT /posts/{id}', () => {
    // Arrange
    const updatedPost = new PostDTO('Editado', 'Nueva desc', 1, 0, new Date());

    let response: PostDTO | undefined;

    // Act
    service
      .updatePost('post-1', updatedPost)
      .subscribe((res) => (response = res));

    const req = httpMock.expectOne('http://localhost:3000/posts/post-1');
    expect(req.request.method).toBe('PUT');

    req.flush(updatedPost);

    // Assert
    expect(response).toEqual(updatedPost);
  });

  it('debería dar like a un post con PUT /posts/like/{id}', () => {
    // Arrange
    const mockResponse = { affected: 1 }; // updateResponse

    let response: { affected: number } | undefined;

    // Act
    service.likePost('post-1').subscribe((res) => (response = res));

    const req = httpMock.expectOne('http://localhost:3000/posts/like/post-1');
    expect(req.request.method).toBe('PUT');

    req.flush(mockResponse);

    // Assert
    expect(response).toEqual(mockResponse);
  });

  it('debería dar dislike a un post con PUT /posts/dislike/{id}', () => {
    // Arrange
    const mockResponse = { affected: 1 }; // updateResponse

    let response: { affected: number } | undefined;

    // Act
    service.dislikePost('post-1').subscribe((res) => (response = res));

    const req = httpMock.expectOne(
      'http://localhost:3000/posts/dislike/post-1',
    );
    expect(req.request.method).toBe('PUT');

    req.flush(mockResponse);

    // Assert
    expect(response).toEqual(mockResponse);
  });

  it('debería eliminar un post con DELETE /posts/{id}', () => {
    // Arrange
    const mockResponse = { affected: 1 }; // deleteResponse

    let response: { affected: number } | undefined;

    // Act
    service.deletePost('post-1').subscribe((res) => (response = res));

    const req = httpMock.expectOne('http://localhost:3000/posts/post-1');
    expect(req.request.method).toBe('DELETE');

    // Simulamos respuesta del servidor
    req.flush(mockResponse);

    // Assert
    expect(response).toEqual(mockResponse);
  });
});
