import { parse } from 'node-html-parser';

const exception_attrs = ['alt', 'src']

function stripAttributes(parent) {
    parent.querySelectorAll('*').forEach((elem, i) => {
        let attrs = {}

       Object.keys(elem.attributes).forEach((attr, i) => {
            if (exception_attrs.includes(attr) && elem.getAttribute(attr).length > 0) {
                console.log(elem.getAttribute(attr));
                attrs[attr] = elem.getAttribute(attr);
            }
        })

        elem.setAttributes(attrs);
    });

    return parent;
}

export const ValidSites = {
    AmericanAirlines: "www.aa.com",
    Tripadvisor: "www.tripadvisor.com",
    AirBnb: "www.airbnb.com",
    Yelp: "www.yelp.com",
}

const CSSSelectors = {
    [ValidSites.AmericanAirlines]: "app-slice-details > div",
    [ValidSites.Tripadvisor]: ".result-card",
    [ValidSites.AirBnb]: "[aria-live=polite] > div > [class=\" dir dir-ltr\"]",
    [ValidSites.Yelp]: "ul > li [data-testid]",
}

export function getBestSiteForUrl(inURL) {
    var url = new URL(inURL);
    var hostname = url.hostname;
    for (let site in ValidSites) {
        if (hostname.includes(ValidSites[site])) {
            return ValidSites[site];
        }
    }
}

export function extractElemList(html, site) {
    var cssQuery = CSSSelectors[site];
    var $ = parse(html);
    var elems = $.querySelectorAll(cssQuery);
    console.log(elems);
    return elems.map((elem, i) => {
        return stripAttributes(elem).outerHTML;
    }).concat({url: site});
}