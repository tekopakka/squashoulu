# Squash Oulu Website

Tämä kansio sisältää staattisen squash-seuran verkkosivuston. Sivusto on rakennettu responsiiviseksi ja tukee suomen- ja englanninkielistä sisältöä.

Ominaisuudet:

- Navigaatio ilman välilyöntejä, aktiivinen sivu korostettu
- Sivupalkki tapahtumilla (ei muokkausmahdollisuutta)
- Galleria kuvina taulukossa
- Alatunniste sosiaalisen median linkeille
- Mobiiili- ja desktop-ystävällinen asettelu

## Sivuston ajaminen lokaalisti

Sivusto on staattinen HTML/CSS/JS-projekti, joten sitä ei tarvitse buildata.

### Vaihtoehto 1: Pythonin HTTP-palvelin

1. Avaa terminaali kansiossa `squashoulu`.
2. Käynnistä paikallinen palvelin:

	```powershell
	python -m http.server 8000
	```

3. Avaa selaimessa:

	```
	http://localhost:8000/docs/index.html
	```

4. Pysäytä palvelin painamalla `Ctrl + C`.

### Vaihtoehto 2: VS Code Live Server

1. Avaa tiedosto `docs/index.html` VS Codessa.
2. Käynnistä Live Server (esim. "Open with Live Server").
3. Sivu avautuu selaimeen automaattisesti.

## Huomio

- Tapahtumat ladataan tiedostosta `docs/data/events.json`, joten sivustoa kannattaa ajaa HTTP-palvelimen kautta.
- Pelkkä tiedoston avaaminen suoraan levyltä (`file://`) voi estää osan toiminnoista selaimen suojausten takia.

## Turnauskuvien lisääminen

Etusivun PSA Nallisport 2026 -kuvakortti näyttää neljän kuvan esikatselun ja avaa kuvat karusellissa. Kuvia selataan nuolipainikkeilla tai näppäimistön vasemmalla ja oikealla nuolinäppäimellä. Lisää uudet kuvat kansioon `docs/assets/frontpage/psa_nallisport_2026/` ja lisää niitä vastaavat `<img>`-elementit tiedoston `docs/index.html` `photo-dialog-images`-osioon. Lisää kuville kuvailevat `alt`-tekstit sekä niiden englanninkieliset käännökset tiedostoon `docs/js/app.js` muiden turnauskuvien tapaan. Kuvat näkyvät karusellissa samassa järjestyksessä kuin ne on lueteltu HTML:ssä. Esikatselun kuvia voi vaihtaa saman tiedoston `news-gallery-preview`-osiossa.
