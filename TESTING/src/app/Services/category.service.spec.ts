import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CategoryDTO } from '../Models/category.dto';
import { CategoryService, deleteResponse } from './category.service';

/**
 * En este fichero probamos el servicio CategoryService.
 * En lugar de HttpClientTestingModule (deprecado),
 * usamos la nueva API basada en providers:
 *
 *   - provideHttpClient()
 *   - provideHttpClientTesting()
 */

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  const baseUrl = 'http://localhost:3000/categories';

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Nueva forma recomendada de configurar HttpClient en tests
      providers: [
        provideHttpClient(), // HttpClient "normal"
        provideHttpClientTesting(), // Backend de pruebas + HttpTestingController
        CategoryService,
      ],
    });

    // Obtenemos las dependencias desde el inyector de TestBed
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no quedan peticiones pendientes sin manejar
    httpMock.verify();
  });

  it('debería crear la instancia del servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener las categorías de un usuario con GET /users/categories/{userId}', () => {
    // Arrange
    const userId = 'user-1';
    const mockCategories: CategoryDTO[] = [
      new CategoryDTO('Cat 1', 'Desc 1', '#fff'),
      new CategoryDTO('Cat 2', 'Desc 2', '#000'),
    ];
    let response: CategoryDTO[] | undefined;

    // Act: llamamos al servicio y nos suscribimos
    service.getCategoriesByUserId(userId).subscribe((res) => (response = res));

    /**
     * HttpTestingController intercepta la petición realizada por HttpClient.
     * expectOne comprueba que se ha hecho UNA petición a la URL indicada
     * y nos devuelve un objeto "req" que representa esa petición.
     */
    const req = httpMock.expectOne(
      `http://localhost:3000/users/categories/${userId}`,
    );

    // Comprobamos que el método HTTP es el esperado
    expect(req.request.method).toBe('GET');

    // Simulamos la respuesta de la API (como si el servidor devolviera estos datos)
    req.flush(mockCategories);

    // Assert: la respuesta del observable debe ser el array simulado
    expect(response).toEqual(mockCategories);
  });

  it('debería crear una categoría con POST /categories', () => {
    // Arrange
    const newCategory = new CategoryDTO('Nueva', 'Descripción', '#abc');

    let response: CategoryDTO | undefined;

    // Act
    service.createCategory(newCategory).subscribe((res) => (response = res));

    const req = httpMock.expectOne(baseUrl);

    // Comprobamos sólo el método
    expect(req.request.method).toBe('POST');

    // Simulamos la respuesta de la API
    req.flush(newCategory);

    // Assert
    expect(response).toEqual(newCategory);
  });

  it('debería obtener una categoría por id con GET /categories/{id}', () => {
    // Arrange
    const categoryId = 'cat-1';
    const mockCategory = new CategoryDTO('Cat 1', 'Desc 1', '#fff');

    let response: CategoryDTO | undefined;

    // Act: llamamos al servicio y nos suscribimos
    service.getCategoryById(categoryId).subscribe((res) => (response = res));

    /**
     * HttpTestingController intercepta la petición realizada por HttpClient.
     * expectOne comprueba que se ha hecho UNA petición a la URL indicada
     * y nos devuelve un objeto "req" que representa esa petición.
     */
    const req = httpMock.expectOne(`${baseUrl}/${categoryId}`);

    // Comprobamos que el método HTTP es el esperado
    expect(req.request.method).toBe('GET');

    // Simulamos la respuesta de la API (como si el servidor devolviera estos datos)
    req.flush(mockCategory);

    // Assert: la respuesta del observable debe ser la categoría simulada
    expect(response).toEqual(mockCategory);
  });

  it('debería actualizar una categoría con PUT /categories/{id}', () => {
    // Arrange
    const categoryId = 'cat-1';
    const updatedCategory = new CategoryDTO('Editada', 'Nueva desc', '#fff');

    let response: CategoryDTO | undefined;

    // Act
    service
      .updateCategory(categoryId, updatedCategory)
      .subscribe((res) => (response = res));

    const req = httpMock.expectOne(`${baseUrl}/${categoryId}`);

    // Comprobamos método
    expect(req.request.method).toBe('PUT');

    // Simulamos la respuesta de la API
    req.flush(updatedCategory);

    // Assert
    expect(response).toEqual(updatedCategory);
  });

  it('debería eliminar una categoría con DELETE /categories/{id}', () => {
    // Arrange
    const categoryId = 'cat-1';
    const mockResponse: deleteResponse = { affected: 1 };
    let response: deleteResponse | undefined;

    // Act
    service.deleteCategory(categoryId).subscribe((res) => (response = res));

    const req = httpMock.expectOne(`${baseUrl}/${categoryId}`);
    expect(req.request.method).toBe('DELETE');

    // Simulamos la respuesta de la API
    req.flush(mockResponse);

    // Assert: la respuesta del observable debe ser la respuesta simulada del service
    expect(response).toEqual(mockResponse);
  });
});
