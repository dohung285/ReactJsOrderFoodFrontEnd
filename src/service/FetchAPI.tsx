import axios from "axios";
import { Component } from "react";
import { useKeycloak } from "@react-keycloak/web";
class FetchAPI extends Component {
  public BASE_URL = process.env.REACT_APP_BASE_API_URL;
  private axiosInstance: any;
  constructor(props: any) {
    super(props);
    // const { keycloak } = useKeycloak();
    const [keycloak] = useKeycloak();
    const currentUserValue = keycloak.authenticated ? keycloak.token : "";
    // console.log('keycloak.token', keycloak.token)
    this.axiosInstance = axios.create({
      baseURL: this.BASE_URL,
      timeout: 30000,
      headers: {
        Authorization: `Bearer ${currentUserValue}`,
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "multipart/form-data",
      },
      httpAgent: true,
    });
  }

  public async request(path: string, data: object, method: string) {
    const dynamicKeyData = method === "GET" ? "params" : "data";
    const configRequest = {
      url: path,
      method,
      [dynamicKeyData]: data,
    };
    try {
      const result = await this.axiosInstance
        .request(configRequest)
        .catch((response: any) => this.handleResponse(response));
      return result.data;
    } catch (error) {
      console.log(JSON.stringify(error));
    } finally {
    }
  }

  public handleResponse(error: any) {
    // const { keycloak } = useKeycloak();
    const [keycloak] = useKeycloak();
    const response = error.response;
    console.log(error);
    if (response === undefined) {
      window.location.hash = "/500";
    }
    if (response && response.status === 401) {
      keycloak.logout();
      window.location.hash = "/login";
    }
    if (response && response.status === 403) {
      window.location.hash = "/403";
    }
    if (response && response.status === 500) {
      window.location.hash = "/500";
    }
    throw new Error(error);
  }

  
}

export default FetchAPI;
