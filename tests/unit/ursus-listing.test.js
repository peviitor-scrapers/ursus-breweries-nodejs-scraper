import { describe, it, expect, beforeAll } from '@jest/globals';

// SAP SuccessFactors search results: one tr.data-row per job, title link is a.jobTitle-link
const HTML = `
<table><tbody>
<tr class="data-row"><td class="colTitle"><span class="jobTitle hidden-phone">
  <a class="jobTitle-link" href="/ursus-breweries/job/Bucuresti-MARKETING-FINANCE-ANALYST/1373817057/">MARKETING FINANCE ANALYST</a></span></td>
  <td class="colDate"><span class="jobDate">2 Oct 2026</span></td></tr>
<tr class="data-row"><td class="colTitle"><span class="jobTitle hidden-phone">
  <a class="jobTitle-link" href="/ursus-breweries/job/Bucuresti-SALES-FINANCE-BUSINESS-PARTNER/1373822057/">SALES FINANCE BUSINESS PARTNER</a></span></td>
  <td class="colDate"><span class="jobDate">2 Oct 2026</span></td></tr>
</tbody></table>`;

describe('Ursus (SuccessFactors) listing parser', () => {
  let index;
  beforeAll(async () => { index = await import('../../scraper/index.js'); });

  it('extracts title and permalink from every data-row', () => {
    const items = index.parseListing(HTML);
    expect(items.map((i) => i.title)).toEqual(['MARKETING FINANCE ANALYST', 'SALES FINANCE BUSINESS PARTNER']);
    expect(items[0].url).toBe('/ursus-breweries/job/Bucuresti-MARKETING-FINANCE-ANALYST/1373817057/');
  });
});