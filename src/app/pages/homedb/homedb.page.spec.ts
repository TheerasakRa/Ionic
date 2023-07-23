import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HomedbPage } from './homedb.page';

describe('HomedbPage', () => {
  let component: HomedbPage;
  let fixture: ComponentFixture<HomedbPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomedbPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
