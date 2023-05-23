export class FetchAPI{
    private URL(requestParameters: Partial<RequestParameters>): string{
        return `${requestParameters.baseUrl ? requestParameters.baseUrl : "http://localhost:3000/api"}/${requestParameters.controller}${requestParameters.action ? `/${requestParameters.action}` : ''}`;
      }
      async get(requestParameters: Partial<RequestParameters>, id?: string) : Promise<Response>{
        let url:string = "";
        if (requestParameters.fullEndPoint){
          url = requestParameters.fullEndPoint;
        } else {
          url = `${this.URL(requestParameters)}${id ? id : ''}`;
        }
        return await fetch(url,{
            headers: requestParameters.headers
          })
      }
      async post(requestParameters: Partial<RequestParameters>, body: any, cache?:RequestCache) : Promise<Response>{
        try {
          let url = "";
          if (requestParameters.fullEndPoint){
            url = requestParameters.fullEndPoint;
          } else {
            url = this.URL(requestParameters);
          }
          return await fetch(url,{
            method: 'POST',
            headers: requestParameters.headers,
            body: JSON.stringify(body),
            cache: cache ? cache : 'default'
          })
        } catch (error:any) {
          return error;
        }

      }
}

export class RequestParameters{
  controller?: string
  action?: string
  headers?: HeadersInit
  baseUrl?: string
  fullEndPoint?: string
}