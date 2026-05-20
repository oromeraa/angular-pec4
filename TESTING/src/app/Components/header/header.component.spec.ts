import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let navigateSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [provideRouter([])],
    });

    const router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigateByUrl');

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería navegar a "home"', () => {
    component.navigationTo('home');
    expect(navigateSpy).toHaveBeenCalledWith('home');
  });

  it('Debería navegar a "login"', () => {
    component.navigationTo('login');
    expect(navigateSpy).toHaveBeenCalledWith('login');
  });

  it('Debería navegar a "register"', () => {
    component.navigationTo('register');
    expect(navigateSpy).toHaveBeenCalledWith('register');
  });

  it('Debería navegar a "posts"', () => {
    component.navigationTo('posts');
    expect(navigateSpy).toHaveBeenCalledWith('posts');
  });

  it('Debería navegar a "categories"', () => {
    component.navigationTo('categories');
    expect(navigateSpy).toHaveBeenCalledWith('categories');
  });

  it('Debería navegar a "profile"', () => {
    component.navigationTo('profile');
    expect(navigateSpy).toHaveBeenCalledWith('profile');
  });

  it('Debería navegar a "home" al hacer logout', () => {
    component.logout();
    expect(navigateSpy).toHaveBeenCalledWith('home');
  });

  it('Debería mostrar los menús "home", "login" y "register" cuando no estamos autenticados', () => {
    // Arrange
    const compiled: HTMLElement = fixture.nativeElement;

    // Act
    const buttons = Array.from(compiled.querySelectorAll('button'));

    const homeBtn = buttons.filter((btn) => btn.textContent?.includes('Home'));

    const loginBtn = buttons.filter((btn) =>
      btn.textContent?.includes('Login'),
    );

    const registerBtn = buttons.filter((btn) =>
      btn.textContent?.includes('Register'),
    );

    // Assert
    expect(homeBtn[0]).toBeTruthy();
    expect(loginBtn[0]).toBeTruthy();
    expect(registerBtn[0]).toBeTruthy();
  });

  it('Debería mostrar los menús "home", "admin posts", "admin categories", "profile" y "logout" cuando estamos autenticados', () => {
    // Arrange
    component.showAuthSection = true;
    component.showNoAuthSection = false;
    fixture.detectChanges();

    const compiled: HTMLElement = fixture.nativeElement;

    // Act
    const buttons = Array.from(compiled.querySelectorAll('button'));
    const homeBtn = buttons.filter((btn) => btn.textContent?.includes('Home'));
    const postsBtn = buttons.filter((btn) =>
      btn.textContent?.includes('Admin posts'),
    );
    const categoriesBtn = buttons.filter((btn) =>
      btn.textContent?.includes('Admin categories'),
    );
    const profileBtn = buttons.filter((btn) =>
      btn.textContent?.includes('Profile'),
    );
    const logoutBtn = buttons.filter((btn) =>
      btn.textContent?.includes('Logout'),
    );

    // Assert
    expect(homeBtn[0]).toBeTruthy();
    expect(postsBtn[0]).toBeTruthy();
    expect(categoriesBtn[0]).toBeTruthy();
    expect(profileBtn[0]).toBeTruthy();
    expect(logoutBtn[0]).toBeTruthy();
  });
});
