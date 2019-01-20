import { Injectable } from "@angular/core";
import { HttpInterceptor,
         HttpRequest, 
         HttpHandler } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        const t = environment.token;

        if (t) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + t)
            });

            return next.handle(cloned);
        }

        else {
            return next.handle(req);
        }
    }
}