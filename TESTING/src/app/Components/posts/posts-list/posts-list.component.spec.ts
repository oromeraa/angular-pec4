import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { PostDTO } from 'src/app/Models/post.dto';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { PostService } from 'src/app/Services/post.service';
import { PostsListComponent } from './posts-list.component';

describe('PostsListComponent', () => {
  let component: PostsListComponent;
  let fixture: ComponentFixture<PostsListComponent>;
  let postServiceSpy: jasmine.SpyObj<PostService>;
  let localStorageSpy: jasmine.SpyObj<LocalStorageService>;
  let router: Router;

  // Array de posts de prueba que usaremos en los tests
  const MOCK_POSTS: PostDTO[] = [
    new PostDTO('Post 1', 'Desc 1', 0, 0, new Date()),
    new PostDTO('Post 2', 'Desc 2', 0, 0, new Date()),
  ];

  /**
   * Antes de cada test:
   *  - Creamos un "spy" (espía) del servicio PostService.
   *  - Creamos un "spy" del LocalStorageService.
   *  - Configuramos el TestBed con el componente y el Router de pruebas.
   *  - Creamos el componente y disparamos el constructor con createComponent().
   */
  beforeEach(() => {
    // Creamos un objeto espía del PostService
    postServiceSpy = jasmine.createSpyObj('PostService', ['getPostsByUserId']);

    // Creamos un spy del LocalStorageService para que get('user_id') devuelva un valor
    localStorageSpy = jasmine.createSpyObj('LocalStorageService', ['get']);

    // Definimos qué devolverán los spies cuando el componente los llame
    postServiceSpy.getPostsByUserId.and.returnValue(of(MOCK_POSTS));
    localStorageSpy.get.and.returnValue('user-1');

    TestBed.configureTestingModule({
      declarations: [PostsListComponent],
      imports: [CommonModule, RouterTestingModule],
      providers: [
        // En lugar de los servicios reales, usamos nuestros spy
        { provide: PostService, useValue: postServiceSpy },
        { provide: LocalStorageService, useValue: localStorageSpy },
      ],
    });

    // Creamos el componente y su fixture (envoltorio de pruebas)
    fixture = TestBed.createComponent(PostsListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    // detectChanges ejecuta el primer renderizado
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a getPostsByUserId al cargar y asignar la respuesta', () => {
    // Assert: el servicio se ha llamado y posts tiene la respuesta esperada
    expect(postServiceSpy.getPostsByUserId).toHaveBeenCalled();
    expect(component.posts).toEqual(MOCK_POSTS);
  });

  it('debería navegar a /user/post/ al crear un post', () => {
    // Arrange
    const spy = spyOn(router, 'navigateByUrl');

    // Act
    component.createPost();

    // Assert
    expect(spy).toHaveBeenCalledWith('/user/post/');
  });

  it('debería navegar a /user/post/{id} al actualizar un post', () => {
    // Arrange
    const spy = spyOn(router, 'navigateByUrl');

    // Act
    component.updatePost('post-1');

    // Assert
    expect(spy).toHaveBeenCalledWith('/user/post/post-1');
  });
});
