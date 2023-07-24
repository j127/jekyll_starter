/**
 * This quick script runs after the site is deployed to production. It checks to
 * be sure that all four versions of the domain are online:
 *
 * - HTTP (no-WWW)
 * - HTTP (WWW)
 * - HTTPs (no-WWW)
 * - HTTPs (WWW)
 *
 * It helps prevent the dreaded error where a site looks like it works but then
 * you realize that it only works for WWW but for no-WWW or something like that.
 */
import fs from "fs";
import path from "path";

import YAML from "yaml";

console.log("running post-deploy tests");

type JekyllConfig = {
    url: string;
    title: string;
    email: string;
    description: string;
    baseurl: string;
    // if anything else is needed, add it here
};

/**
 * Loads data from the _config.yml file.
 */
function loadConfig(): JekyllConfig {
    const configFile = path.join(__dirname, "..", "_config.yml");
    const file = fs.readFileSync(configFile, "utf8");
    const config = YAML.parse(file);
    return config;
}

/**
 * Extracts the domain name from a URL.
 */
function extractDomain(url: string): string {
    return new URL(url).hostname;
}

/**
 * Generate all four versions of the production URL that should be tested.
 */
function generateURLs(baseDomainAndPath: string): string[] {
    return [
        `http://${baseDomainAndPath}`,
        `http://www.${baseDomainAndPath}`,
        `https://${baseDomainAndPath}`,
        `https://www.${baseDomainAndPath}`,
    ];
}

/**
 * Fetch a URL and get the status code.
 */
async function checkURL(url: string): Promise<[string, number] | undefined> {
    try {
        const response = await fetch(url);
        const statusCode = response.status;
        return [url, statusCode];
    } catch (e) {
        console.error(`Couldn't fetch ${url}: ${e}`);
    }
}

function printReport(results: ([string, number] | undefined)[]): void {
    console.log("\nAll results below should show a 200 status code.");
    console.log("code\turl");
    console.log("====\t===");

    results.map((r) => {
        if (r) {
            console.log(`${r[1]}\t${r[0]}`);
        } else {
            console.error("no result");
        }
    });
}

async function main() {
    const { url, baseurl } = loadConfig();
    const domain = extractDomain(url);
    const basePath = baseurl === "" ? "/" : baseurl;
    const urls = generateURLs(domain + basePath);
    const results = await Promise.all(urls.map(checkURL));
    printReport(results);
}

main();
