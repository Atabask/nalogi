/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/communal_service": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.communal_service.id"];
          year?: parameters["rowFilter.communal_service.year"];
          month?: parameters["rowFilter.communal_service.month"];
          electro?: parameters["rowFilter.communal_service.electro"];
          hot_water?: parameters["rowFilter.communal_service.hot_water"];
          cold_water?: parameters["rowFilter.communal_service.cold_water"];
          user_id?: parameters["rowFilter.communal_service.user_id"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["communal_service"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** communal_service */
          communal_service?: definitions["communal_service"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.communal_service.id"];
          year?: parameters["rowFilter.communal_service.year"];
          month?: parameters["rowFilter.communal_service.month"];
          electro?: parameters["rowFilter.communal_service.electro"];
          hot_water?: parameters["rowFilter.communal_service.hot_water"];
          cold_water?: parameters["rowFilter.communal_service.cold_water"];
          user_id?: parameters["rowFilter.communal_service.user_id"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.communal_service.id"];
          year?: parameters["rowFilter.communal_service.year"];
          month?: parameters["rowFilter.communal_service.month"];
          electro?: parameters["rowFilter.communal_service.electro"];
          hot_water?: parameters["rowFilter.communal_service.hot_water"];
          cold_water?: parameters["rowFilter.communal_service.cold_water"];
          user_id?: parameters["rowFilter.communal_service.user_id"];
        };
        body: {
          /** communal_service */
          communal_service?: definitions["communal_service"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/profiles": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          user_name?: parameters["rowFilter.profiles.user_name"];
          adress?: parameters["rowFilter.profiles.adress"];
          phone?: parameters["rowFilter.profiles.phone"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["profiles"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          user_name?: parameters["rowFilter.profiles.user_name"];
          adress?: parameters["rowFilter.profiles.adress"];
          phone?: parameters["rowFilter.profiles.phone"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          user_name?: parameters["rowFilter.profiles.user_name"];
          adress?: parameters["rowFilter.profiles.adress"];
          phone?: parameters["rowFilter.profiles.phone"];
        };
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
}

export interface definitions {
  communal_service: {
    /**
     * Format: integer
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /** Format: text */
    year: string;
    /** Format: text */
    month: string;
    /** Format: text */
    electro: string;
    /** Format: text */
    hot_water: string;
    /** Format: text */
    cold_water: string;
    /** Format: uuid */
    user_id: string;
  };
  profiles: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
    /** Format: text */
    user_name: string;
    /** Format: text */
    adress: string;
    /** Format: text */
    phone: string;
  };
}

export interface parameters {
  /**
   * @description Preference
   * @enum {string}
   */
  preferParams: "params=single-object";
  /**
   * @description Preference
   * @enum {string}
   */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /**
   * @description Preference
   * @enum {string}
   */
  preferCount: "count=none";
  /** @description Filtering Columns */
  select: string;
  /** @description On Conflict */
  on_conflict: string;
  /** @description Ordering */
  order: string;
  /** @description Limiting and Pagination */
  range: string;
  /**
   * @description Limiting and Pagination
   * @default items
   */
  rangeUnit: string;
  /** @description Limiting and Pagination */
  offset: string;
  /** @description Limiting and Pagination */
  limit: string;
  /** @description communal_service */
  "body.communal_service": definitions["communal_service"];
  /** Format: integer */
  "rowFilter.communal_service.id": string;
  /** Format: text */
  "rowFilter.communal_service.year": string;
  /** Format: text */
  "rowFilter.communal_service.month": string;
  /** Format: text */
  "rowFilter.communal_service.electro": string;
  /** Format: text */
  "rowFilter.communal_service.hot_water": string;
  /** Format: text */
  "rowFilter.communal_service.cold_water": string;
  /** Format: uuid */
  "rowFilter.communal_service.user_id": string;
  /** @description profiles */
  "body.profiles": definitions["profiles"];
  /** Format: uuid */
  "rowFilter.profiles.id": string;
  /** Format: text */
  "rowFilter.profiles.user_name": string;
  /** Format: text */
  "rowFilter.profiles.adress": string;
  /** Format: text */
  "rowFilter.profiles.phone": string;
}

export interface operations {}

export interface external {}
