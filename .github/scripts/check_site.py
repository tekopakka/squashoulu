#!/usr/bin/env python3
import os
import sys
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin
from urllib.request import Request, urlopen

BASE_URL = os.environ.get("BASE_URL", "").strip()

PAGES = [
    ("index.html", "Tervetuloa Squash Ouluun"),
    ("about.html", "Meistä"),
    ("sport.html", "Squash urheiluna"),
    ("juniors.html", "Juniorit"),
    ("gallery.html", "Galleria"),
    ("contacts.html", "Yhteystiedot"),
]

if not BASE_URL:
    print("ERROR: BASE_URL is not configured. Set SITE_BASE_URL in repository secrets.")
    sys.exit(1)

failures = []

for page, expected_text in PAGES:
    url = urljoin(BASE_URL.rstrip('/') + '/', page)
    print(f"Checking {url} ...")
    request = Request(url, headers={"User-Agent": "Mozilla/5.0 (GitHub Actions monitor)"})
    try:
        with urlopen(request, timeout=30) as response:
            content = response.read().decode('utf-8', errors='replace')
            if expected_text not in content:
                failures.append(f"Expected text not found on {url}: '{expected_text}'")
    except HTTPError as exc:
        failures.append(f"HTTP {exc.code} error on {url}: {exc.reason}")
    except URLError as exc:
        failures.append(f"Network error on {url}: {exc.reason}")
    except Exception as exc:
        failures.append(f"Unexpected error on {url}: {exc}")

if failures:
    print("The Squash Oulu site monitor detected issues on the following pages:")
    for fail in failures:
        print("-", fail)
    sys.exit(1)

print("All pages are reachable and contain the expected static text.")
sys.exit(0)
