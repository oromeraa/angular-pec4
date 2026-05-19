import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let navigateSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule],
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
});
