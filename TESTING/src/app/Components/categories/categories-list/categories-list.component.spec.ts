import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';

import { CategoryDTO } from 'src/app/Models/category.dto';
import { CategoryService } from 'src/app/Services/category.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { CategoriesListComponent } from './categories-list.component';

describe('CategoriesListComponent', () => {
  let component: CategoriesListComponent;
  let fixture: ComponentFixture<CategoriesListComponent>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let localStorageSpy: jasmine.SpyObj<LocalStorageService>;
  let router: Router;

  // Array de categorías de prueba que usaremos en los tests
  const MOCK_CATEGORIES: CategoryDTO[] = [
    new CategoryDTO('Cat 1', 'Desc 1', '#fff'),
    new CategoryDTO('Cat 2', 'Desc 2', '#000'),
  ];

  /**
   * Antes de cada test:
   *  - Creamos un "spy" (espía) del servicio CategoryService.
   *  - Creamos un "spy" del LocalStorageService.
   *  - Configuramos el TestBed con el componente y el Router de pruebas.
   *  - Creamos el componente y disparamos el constructor con createComponent().
   */
  beforeEach(() => {
    // Creamos un objeto espía del CategoryService
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', [
      'getCategoriesByUserId',
    ]);

    // Creamos un spy del LocalStorageService para que get('user_id') devuelva un valor
    localStorageSpy = jasmine.createSpyObj('LocalStorageService', ['get']);

    // Definimos qué devolverán los spies cuando el componente los llame
    categoryServiceSpy.getCategoriesByUserId.and.returnValue(
      of(MOCK_CATEGORIES),
    );
    localStorageSpy.get.and.returnValue('user-1');

    TestBed.configureTestingModule({
      declarations: [CategoriesListComponent],
      imports: [CommonModule],
      providers: [
        provideRouter([]),
        // En lugar de los servicios reales, usamos nuestros spy
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: LocalStorageService, useValue: localStorageSpy },
      ],
    });

    // Creamos el componente y su fixture (envoltorio de pruebas)
    fixture = TestBed.createComponent(CategoriesListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    // detectChanges ejecuta el primer renderizado
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a getCategoriesByUserId al cargar y asignar la respuesta', () => {
    // Assert: el servicio se ha llamado y categories tiene la respuesta esperada
    expect(categoryServiceSpy.getCategoriesByUserId).toHaveBeenCalled();
    expect(component.categories).toEqual(MOCK_CATEGORIES);
  });

  it('debería navegar a /user/category/ al crear una categoría', () => {
    // Arrange
    const spy = spyOn(router, 'navigateByUrl');

    // Act
    component.createCategory();

    // Assert
    expect(spy).toHaveBeenCalledWith('/user/category/');
  });

  it('debería navegar a /user/category/{id} al actualizar una categoría', () => {
    // Arrange
    const spy = spyOn(router, 'navigateByUrl');

    // Act
    component.updateCategory('cat-1');

    // Assert
    expect(spy).toHaveBeenCalledWith('/user/category/cat-1');
  });
});
