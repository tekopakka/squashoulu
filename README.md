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

