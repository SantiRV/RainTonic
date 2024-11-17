Riassunto del progetto

Ho creato un'applicazione meteo in React che consente agli utenti di cercare informazioni meteorologiche, visualizzare i dettagli del clima e salvare città nei loro preferiti. 
Ecco un riepilogo delle principali funzionalità e componenti implementati:

Componenti principali

SearchBar
Un componente che consente agli utenti di cercare una città. Effettua una chiamata API per ottenere le coordinate geografiche della città inserita dall'utente e utilizza queste 
informazioni per recuperare i dati meteorologici.

WeatherDetails
Mostra i dettagli del clima attuale della città selezionata, inclusa la temperatura, la velocità del vento e altre informazioni utili. Offre anche un pulsante per 
aggiungere la città ai preferiti.

HourlyWeather
Visualizza un grafico o un elenco con le previsioni orarie delle temperature e dei codici meteo per le successive 24 ore.

Favorites
Questo componente permette di visualizzare tutte le città salvate come preferite. Le città vengono mostrate come card, e ogni card contiene:

Il nome della città.
La temperatura attuale (se disponibile).
Pulsanti per rimuovere la città dai preferiti o espandere la card per visualizzare dettagli come le previsioni orarie e il clima attuale.
Le card si espandono al centro dello schermo e consentono di scorrere il contenuto all'interno.

Header
Un semplice componente che include il titolo dell'applicazione.

Funzioni e logica principale
Chiamate alle API

Geocoding API: Ottiene le coordinate (latitudine e longitudine) della città cercata.
Weather API: Utilizza le coordinate per ottenere i dati sul clima attuale e le previsioni orarie.
Gestione dello stato
Ho utilizzato lo stato globale per gestire:

weatherData: Dati sul clima attuale della città selezionata.
hourlyData: Previsioni orarie della città selezionata.
favorites: Elenco delle città salvate come preferite, con ordinamento automatico basato sulla temperatura.
isWeatherDetailsOpen: Controlla la visibilità dei componenti dettagli meteo.
Aggiunta e rimozione dei preferiti
Le città possono essere salvate come preferite. Quando vengono aggiunte o rimosse, l'elenco viene automaticamente ordinato per temperatura (da più bassa a più alta) e salvato nel 
localStorage.

Espansione delle card nei preferiti
Le card nei preferiti possono essere espanse per mostrare i dettagli del clima attuale e le previsioni orarie. L'espansione è elegante, centrata sullo schermo, e consente lo scrolling 
per una migliore esperienza utente.

Persistenza dei dati
Utilizzo localStorage per salvare i preferiti, in modo che gli utenti non perdano i dati dopo il refresh della pagina.

Miglioramenti del design
Ho utilizzato Bootstrap per uno stile pulito e responsive. Inoltre, ho aggiunto effetti come transizioni fluide per migliorare l'esperienza utente.

Risultato finale
L'applicazione offre un'esperienza intuitiva e ben organizzata, permettendo agli utenti di accedere facilmente alle informazioni meteo e gestire le loro città preferite. 
