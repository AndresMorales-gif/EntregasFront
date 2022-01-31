import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { EnvioComponent } from './envio.component';

describe('EnvioComponent', () => {
  let component: EnvioComponent;
  let fixture: ComponentFixture<EnvioComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnvioComponent],
      imports: [RouterTestingModule.withRoutes([])]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvioComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('called create', () => {
    const navigateByUrl = spyOn(router, 'navigateByUrl').and.resolveTo(true);
    component.redireccionar('test');
    expect(navigateByUrl).toHaveBeenCalledWith('test');
  });
});
