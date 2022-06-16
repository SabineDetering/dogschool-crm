import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginNgxAuthComponent } from './login-ngx-auth.component';

describe('LoginNgxAuthComponent', () => {
  let component: LoginNgxAuthComponent;
  let fixture: ComponentFixture<LoginNgxAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginNgxAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginNgxAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
