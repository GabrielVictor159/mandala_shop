export class IpPerson {
    id?: string;
    ipCode?: string;
    country?: string;
    region?: string;
    city?: string;
    zip?: string;
    lat?: number;
    lon?: number;
    timezone?: string;
    isp?: string;
    org?: string;
    assinature?: string;

    constructor(options: {
        id?: string;
        ipCode?: string;
        country?: string;
        region?: string;
        city?: string;
        zip?: string;
        lat?: number;
        lon?: number;
        timezone?: string;
        isp?: string;
        org?: string;
        assinature?: string;
    } = {}) {
        this.id = options.id;
        this.ipCode = options.ipCode;
        this.country = options.country;
        this.region = options.region;
        this.city = options.city;
        this.zip = options.zip;
        this.lat = options.lat;
        this.lon = options.lon;
        this.timezone = options.timezone;
        this.isp = options.isp;
        this.org = options.org;
        this.assinature = options.assinature;
    }
}
