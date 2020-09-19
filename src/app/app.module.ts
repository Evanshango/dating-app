import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {JwtModule} from '@auth0/angular-jwt';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {NavComponent} from './nav/nav.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './_services/auth.service';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {ErrorInterceptorProvider} from './_services/error.interceptor';
import {MemberListComponent} from './members/member-list/member-list.component';
import {ListsComponent} from './lists/lists.component';
import {MessagesComponent} from './messages/messages.component';
import {appRoutes} from './routes';
import {MemberCardComponent} from './members/member-card/member-card.component';
import {MemberDetailComponent} from './members/member-detail/member-detail.component';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {AlertifyService} from './_services/alertify.service';
import {AuthGuard} from './_guards/auth.guard';
import {UserService} from './_services/user.service';
import {MemberDetailResolver} from './_resolvers/member-detail.resolver';
import {MemberListResolver} from './_resolvers/member-listl.resolver';
import {NgxGalleryModule} from '@kolkov/ngx-gallery';
import {MemberEditComponent} from './members/member-edit/member-edit.component';
import {MemberEditResolver} from './_resolvers/member-edit.resolver';
import {PreventUnsavedChanges} from './_guards/prevent-unsaved-changes.guard';
import {PhotoEditorComponent} from './members/photo-editor/photo-editor.component';
import {FileUploadModule} from 'ng2-file-upload';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {TimeagoModule} from 'ngx-timeago';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {ButtonsModule} from 'ngx-bootstrap/buttons';

export function tokenGetter() {
  return localStorage.getItem('meet_up_token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    PhotoEditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    TimeagoModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    NgxGalleryModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['localhost:5000/api/auth']
      }
    }),
    FileUploadModule
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertifyService,
    AuthGuard,
    UserService,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    PreventUnsavedChanges
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
