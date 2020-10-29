﻿function dowikiOld(place) {
    $.getJSON('https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=' + place + '&origin=*',
        function (data) {
            var obj = data;
            try {
                $("#wiki").html(obj["parse"]["text"]["*"]);
                try {
                    $('#wiki a').each(function () {
                        var href = $(this).attr('href');
                        if (href.includes("http") === false) {
                            $(this).attr('href', "https://en.wikipedia.org" + href);
                            $(this).attr('target', "_blank");
                        }
                    });
                } catch (er) {
                }
            } catch (err) {
                $("#wiki").html(err.message);
            }
        });
}

// mediumZoom('.medium');
$(document).ready(function () {
    $(".img--bg").error(function () {
        this.src = "/assets/img/missing.png";
    });

    $("select:not(.dataTables_wrapper select)").niceSelect();

    $(".navSearch").click(function (e) {
        e.preventDefault();
        $("body").toggleClass("has-search");
        $('body').removeClass('body--static')
        $('.menu-dropdown').removeClass('menu-dropdown--active')
        $("#supersearch").focus();
    });
    $("#cancelSearch, #closer").click(function (e) {
        e.preventDefault();
        $("body").toggleClass("has-search");
    });
    $("#supersearch").keyup(function (e) {
        if (e.which === 27) {
            $("body").toggleClass("has-search");
        } else {
            submitSearch();
        }
    });

    function noSearch() {
        $("#results").html('<section class="px-5 mx-5"><p>Please enter at least 3 characters to search.</p><h3>How to search</h3><p>Enter either the common name ("Common kestrel") or the species name ("Crocodylus palustris") to search. You can also use categorical terms such as "passerine" or "snake".</p><p>There are several search options in the dropdown above the search field to help you narrow down your query.<ul><li>Starts/Ends with: Use when you know the beginning or end of the name.</li><li>Contains: Use when you know the name contains the search query anywhere inside. Best when used with one word.</li><li>Similar to: Use when you are not sure of the exact spelling.</li><li>Sounds like: Use when you don\'t know the spelling at all, but know what the word sounds like. Try experimenting with different spellings.</li></ul></p></section>');
    }

    $("#doSearch").click(function (e) {
        e.preventDefault();
        submitSearch();
    });

    $("#searchOptions").change(function (e) {
        e.preventDefault();
        submitSearch();
    });

    noSearch();

    var data = [{"n":"Apus affinis","c":"Little Swift","t":"passerine"},{"n":"Tatera indica","c":"Indian Gerbil","t":"rodent"},{"n":"Boselaphus tragocamelus","c":"Nilgai","t":"bovid"},{"n":"Gazella bennettii","c":"Indian Gazelle","t":"bovid"},{"n":"Equus hemionus khur","c":"Indian Wild Ass","t":"equid"},{"n":"Sus Scrofa","c":"Indian Wild Pig","t":"suid"},{"n":"Pteropus giganteus","c":"Indian Flying Fox","t":"bat"},{"n":"Herpestes edwardsii","c":"Grey Mongoose","t":"felis"},{"n":"Canis aureus","c":"Jackal","t":"canid"},{"n":"Suncus murinus","c":"House Shrew","t":""},{"n":"Hemiechinis micropus","c":"Indian Hedgehog or Pale hedgehog","t":""},{"n":"Bandicota bengalensis","c":"Lesser Bandicoot-Rat","t":"rodent"},{"n":"Funambulus pennantii","c":"Five-striped Palm Squirrel","t":"rodent"},{"n":"Meriones hurrianae","c":"Indian Desert Jird","t":"rodent"},{"n":"Golunda ellioti","c":"Indian Bush Rat","t":"rodent"},{"n":"Mus booduga","c":"Little Indian Field Mouse","t":"rodent"},{"n":"Rhinopoma microphyllum","c":"Greater Mousetailed Bat","t":"bat,rodent"},{"n":"Pipistrellus pipistrellus","c":"Common Pipistrelle","t":"bat"},{"n":"Hyaena hyaena","c":"Striped Hyena","t":"canid"},{"n":"Mellivora capensis","c":"Honey Badger","t":""},{"n":"Vivericulla indica","c":"Small Indian Civet","t":"felis"},{"n":"Hemiechinis collaris","c":"Longeared Hedgehog","t":""},{"n":"Eutropis macularia","c":"Bronze Grass Skink","t":"lizard"},{"n":"Geochelone elegans","c":"Indian Star Tortoise","t":"chelonian"},{"n":"Oceanodroma monorhis","c":"Swinhoe's Storm-Petrel","t":"seabird"},{"n":"Hemidactylus cf. gleadowi","c":"Gleadow's House Gecko","t":"lizard"},{"n":"Rattus rattus","c":"House Rat","t":"rodent"},{"n":"Coturnix coturnix","c":"Common Quail","t":"fowl"},{"n":"Lepus nigricollis","c":"Indian Hare","t":""},{"n":"Herpestes javanicus","c":"Small Indian Mongoose","t":"felis"},{"n":"Dugong dugon","c":"Dugong","t":"aquatic"},{"n":"Crocodylus palustris","c":"Mugger Crocodile","t":""},{"n":"Ablepharus grayanus","c":"Minor Snake Eyed Skink","t":"snake"},{"n":"Acanthodactylus cantoris","c":"Indian Fringe Fingered Lizard","t":"lizard"},{"n":"Acrochordus granulatus","c":"Little File Snake","t":"snake"},{"n":"Batagur baska","c":"Northern River Terrapin","t":"chelonian"},{"n":"Boiga trigonata","c":"Common Cat Snake","t":"snake"},{"n":"Bungarus caeruleus","c":"Common Krait","t":"snake"},{"n":"Bungarus sindanus","c":"Sind Krait","t":"snake"},{"n":"Calotes minor","c":"Hardwick's Bloodsucker","t":"lizard"},{"n":"Calotes versicolor","c":"Oriental Garden Lizard","t":"lizard"},{"n":"Chamaeleo zeylanicus","c":"Indian Chameleon","t":"lizard"},{"n":"Vulpes bengalensis","c":"Indian Fox","t":"canid"},{"n":"Chelonia mydas","c":"Green Sea Turtle","t":"chelonian"},{"n":"Cyrtopodion kachhense","c":"Kachh Gecko","t":"lizard"},{"n":"Cyrtopodion scabrum","c":"Rough-tailed Gecko","t":"lizard"},{"n":"Dermochelys coriacea","c":"Leatherback Turtle","t":"chelonian"},{"n":"Echis carinatus","c":"Saw-Scaled Viper","t":"snake"},{"n":"Eryx conicus","c":"Common Sand Boa","t":"snake"},{"n":"Eryx johnii","c":"Indian sand Boa/Red Sand Boa","t":"snake"},{"n":"Eublepharis fuscus","c":"West Indian Leopard Gecko","t":"lizard"},{"n":"Eurylepis taeniolatus","c":"Alpine Punjab Skink","t":"lizard"},{"n":"Eutropis carinata","c":"Keeled Indian Mabuya","t":"lizard,skink"},{"n":"Rousettus leschenaulti","c":"Fulvous Fruit Bat","t":"bat"},{"n":"Millardia gleadowii","c":"Sand-coloured Rat","t":"rodent"},{"n":"Hystrix indica","c":"Indian crested porcupine","t":"rodent"},{"n":"Coelognathus helena","c":"Trinket Snake","t":"snake"},{"n":"Manis crassicaudata","c":"Indian Pangolin","t":""},{"n":"Coturnix coromandelica","c":"Rain Quail","t":"fowl"},{"n":"Pavo cristatus","c":"Indian Peafowl","t":"fowl"},{"n":"Hydrophis cyanocinctus","c":"Blue-banded Sea snake","t":"snake"},{"n":"Hydrophis platurus","c":"Yellow-bellied sea snake","t":"snake"},{"n":"Indotyphlops braminus","c":"Brahminy Blind Snake","t":"snake"},{"n":"Lepidochelys olivacea","c":"Olive Redliy Sea Turtle","t":"chelonian"},{"n":"Lissemys punctata","c":"Indian Flapshell Turtle","t":"chelonian"},{"n":"Lycodon aulicus","c":"Indian Wolf Snake","t":"snake"},{"n":"Lycodon striatus","c":"Northern Wolf Snake","t":"snake"},{"n":"Naja naja","c":"Indian Cobra","t":"snake"},{"n":"Oligodon arnensis","c":"Common Kukri Snake","t":"snake"},{"n":"Ophiomorus raithmai","c":"Eastern Sand Swimmer","t":"lizard,skink"},{"n":"Varanus griseus","c":"Desert Monitor","t":"lizard"},{"n":"Ophisops beddomei","c":"Beddome's snake-eye","t":"snake"},{"n":"Hemidactylus sahgali","c":"Sahgal's termite hill gecko","t":"lizard"},{"n":"Ophisops jerdonii","c":"Jerdon's snake-eye","t":"snake"},{"n":"Platyceps ventromaculatus","c":"Glossy-bellied racer snake","t":"snake"},{"n":"Psammophis leithii","c":"Leith's sand snake","t":"snake"},{"n":"Ptyas mucosa","c":"Indian Rat Snake","t":"snake"},{"n":"Python molurus","c":"Indian Python","t":"snake"},{"n":"Saara hardwickii","c":"Indian spiny-tailed lizard","t":"lizard"},{"n":"Sitana spinaecephalus","c":"Spiny-headed Fan-throated Lizard","t":"lizard"},{"n":"Spalerosophis atriceps","c":"Black-headed Royal Snake","t":"snake"},{"n":"Trapelus agilis","c":"Brilliant ground agama","t":"lizard"},{"n":"Varanus bengalensis","c":"Common Indian monitor","t":"lizard"},{"n":"Charadrius alexandrinus","c":"Kentish Plover","t":"wader"},{"n":"Charadrius mongolus","c":"Lesser Sand Plover","t":"wader"},{"n":"Emberiza bruniceps","c":"Red-headed Bunting","t":"passerine"},{"n":"Ophisops kutchensis","c":"Kutch small-scaled Snake-eye","t":"lizard"},{"n":"Perdicula argoondah","c":"Rock Bush Quail","t":"fowl"},{"n":"Hemidactylus leschenaultii","c":"Leschenault's leaf-toed gecko","t":"lizard"},{"n":"Oligodon taeniolatus","c":"Streaked Kukri Snake","t":"snake"},{"n":"Dendrocygna bicolor","c":"Fulvous Whistling Duck","t":"fowl"},{"n":"Dendrocygna javanica","c":"Lesser Whistling Duck","t":"fowl"},{"n":"Anser albifrons","c":"Greater White-fronted Goose","t":"fowl"},{"n":"Anser erythropus","c":"Lesser White-fronted Goose","t":"fowl"},{"n":"Cygnus columbianus","c":"Tundra Swan","t":"fowl"},{"n":"Sarkidiornis melanotos","c":"Knob-billed Duck","t":"fowl"},{"n":"Tadorna Tadorna","c":"Common Shelduck","t":"fowl"},{"n":"Tadorna ferruginea","c":"Ruddy Shelduck","t":"fowl"},{"n":"Nettapus coromandelianus","c":"Cotton Pygmy-goose","t":"fowl,waterbird"},{"n":"Marmaronetta angustirostris","c":"Marbled Duck","t":"fowl"},{"n":"Anas strepera","c":"Gadwall","t":"fowl"},{"n":"Anas penelope","c":"Eurasian Wigeon","t":"fowl"},{"n":"Hemidactylus flaviviridis","c":"Yellow-belly Gecko","t":"lizard"},{"n":"Anas platyrhynchos","c":"Mallard","t":"fowl"},{"n":"Anas clypeata","c":"Northern Shoveler","t":"fowl"},{"n":"Anas acuta","c":"Northern Pintai","t":"fowl"},{"n":"Anas querquedula","c":"Garganey","t":"wader"},{"n":"Anas formosa","c":"Baikal Teal","t":"fowl"},{"n":"Anas crecca","c":"Common Teal","t":"fowl"},{"n":"Aythya ferina","c":"Common Pochard","t":"fowl"},{"n":"Aythya fuligula","c":"Tufted Duck","t":"fowl"},{"n":"Mergus merganser","c":"Goosander","t":"fowl"},{"n":"Bulweria fallax","c":"Jouanin's Petrel","t":"seabird"},{"n":"Francolinus pondicerianus","c":"Grey Francolin","t":"fowl"},{"n":"Francolinus francolinus","c":"Black Francolin","t":"fowl"},{"n":"Wallophis brachy","c":"Indian Smooth Snake","t":"snake"},{"n":"Anas poecilorhyncha","c":"Indian Spot-billed Duck","t":"fowl"},{"n":"Panthera pardus","c":"Common Leopard","t":"felis,big cat"},{"n":"Caracal caracal","c":"Caracal","t":"felis"},{"n":"Fowlea piscator","c":"Chekered Keelback Snake","t":"snake"},{"n":"Ephippiorhynchus asiaticus","c":"Black-necked Stork","t":"wader"},{"n":"Leptoptilos javanicus","c":"Lesser Adjutant","t":"wader"},{"n":"Leptoptilos dubius","c":"Greater Adjutant","t":"wader"},{"n":"Phoenicopterus roseus","c":"Greater Flamingo","t":"wader"},{"n":"Phoenicopterus minor","c":"Lesser Flamingo","t":"wader"},{"n":"Threskiornis melanocephalus","c":"Black-headed Ibis","t":"wader"},{"n":"Pseudibis papillosa","c":"Red-naped Ibis","t":"wader"},{"n":"Plegadis falcinellus","c":"Glossy Ibis","t":"wader"},{"n":"Platelea leucorodia","c":"Eurasian Spoonbill","t":"wader"},{"n":"Butorides striata","c":"Striated Heron","t":"wader"},{"n":"Nycticorax nycticorax","c":"Black-crowned Night Heron","t":"wader"},{"n":"Ardeola grayii","c":"Indian Pond Heron","t":"wader"},{"n":"Ciconia ciconia","c":"White Stork","t":"wader"},{"n":"Ardea cinerea","c":"Grey Heron","t":"wader"},{"n":"Bulbulcus ibis","c":"Cattle Egret","t":"wader"},{"n":"Casmerodius albus","c":"Great Egret","t":"wader"},{"n":"Mesophoyx intermedia","c":"Intermediate Egret","t":"wader"},{"n":"Egretta garzetta","c":"Little Egret","t":"wader"},{"n":"Egretta gularis","c":"Western Reef Egret","t":"wader"},{"n":"Pelecanus onocrotalus","c":"Great White Pelican","t":"seabird"},{"n":"Pelecanus crispus","c":"Dalmatian Pelican","t":"seabird"},{"n":"Phaethon aethereus","c":"Red-billed Tropicbird","t":"seabird"},{"n":"Sula dactylatra","c":"Masked Booby","t":"seabird"},{"n":"Falco Jugger","c":"Laggar Falcon","t":"raptor"},{"n":"Milvus lineatus","c":"Black-eared Kite","t":"raptor"},{"n":"Haliastur indus","c":"Brahminy Kite","t":"raptor"},{"n":"Ardea purpurea","c":"Purple Heron","t":"wader"},{"n":"Milvus milvus","c":"Red Kite","t":"raptor"},{"n":"Ciconia nigra","c":"Black Stork","t":"wader"},{"n":"Mycteria leucocephala","c":"Painted Stork","t":"wader"},{"n":"Emberiza hortulana","c":"Ortolan Bunting","t":"passerine"},{"n":"Phalacrocorax niger","c":"Little Cormorant","t":"raptor,seabird"},{"n":"Phalacrocorax carbo","c":"Great Cormorant","t":"seabird"},{"n":"Falco naumanni","c":"Lesser Kestrel","t":"raptor"},{"n":"Falco tinnunculus","c":"Common Kestrel","t":"raptor"},{"n":"Falco chiquera","c":"Red-necked Falcon","t":"raptor"},{"n":"Falco subbuteo","c":"Eurasian Hobby","t":"raptor"},{"n":"Falco peregrinus","c":"Peregrine Falcon","t":"raptor"},{"n":"Falco pelegrinoides","c":"Barbary Falcon","t":"raptor"},{"n":"Elanus caeruleus","c":"Black-winged Kite","t":"raptor"},{"n":"Pandion haliaetus","c":"Osprey","t":"raptor"},{"n":"Haliaeetus leucogaste","c":"White-bellied Sea Eagle","t":"raptor"},{"n":"Anastomus oscitans","c":"Asian Openbill","t":"wader"},{"n":"Haliaeetus albicilla","c":"White-tailed Eagle","t":"raptor"},{"n":"Gypaetus barbatus","c":"Bearded Vulture","t":"raptor"},{"n":"Falco cherrug","c":"Saker Falcon","t":"raptor"},{"n":"Circaetus gallicus","c":"Short-toed Snake Eagle","t":"raptor"},{"n":"Aythya nyroca","c":"Ferruginous Duck","t":"fowl"},{"n":"Ixobrychus cinnamomeus","c":"Cinnamon Bittern","t":"wader"},{"n":"Botaurus stellaris","c":"Great Bittern","t":"wader"},{"n":"Falco Amurensis","c":"Amur Falcon","t":"raptor"},{"n":"Falco columbarius","c":"Merlin","t":"raptor"},{"n":"Phalacrocorax fuscicollis","c":"Indian Cormorant","t":"seabird"},{"n":"Anhinga melanogaster","c":"Darter","t":"waterbird"},{"n":"Charadrius leschenaultii","c":"Greater Sand Plover","t":"wader"},{"n":"Sula leucogaster","c":"Brown Booby","t":"seabird"},{"n":"Pernis ptilorhynchus","c":"Oriental Honey-buzzard","t":"raptor"},{"n":"Gallicrex cinerea","c":"Watercock","t":"waterbird"},{"n":"Turnix sylvaticus","c":"Small Buttonquail","t":"fowl"},{"n":"Turnix tanki","c":"Yellow-legged Buttonquail","t":"fowl"},{"n":"Gyps himalayensis","c":"Himalayan Griffon","t":"raptor"},{"n":"Gyps fulvus","c":"Griffon Vulture","t":"raptor"},{"n":"Aegypius monachus","c":"Cinereous Vulture","t":"raptor"},{"n":"Sarcogyps calvus","c":"Red-headed Vulture","t":"raptor"},{"n":"Circus aeruginosus","c":"Eurasian Marsh Harrier","t":"raptor"},{"n":"Circus cyaneus","c":"Hen Harrier","t":"raptor"},{"n":"Circus macrourus","c":"Pallid Harrier","t":"raptor"},{"n":"Circus pygargus","c":"Montagu's Harrier","t":"raptor"},{"n":"Accipiter badius","c":"Shikra","t":"raptor"},{"n":"Accipiter nisus","c":"Eurasian Sparrowhawk","t":"raptor"},{"n":"Sypheotides indicus","c":"Lesser Florican","t":"otidiformes,large bird"},{"n":"Butastur teesa","c":"White-eyed Buzzard","t":"raptor"},{"n":"Gyps indicus","c":"Indian Vulture","t":"raptor"},{"n":"Buteo buteo","c":"Common Buzzard","t":"raptor"},{"n":"Aquila hastata","c":"Indian Spotted Eagle","t":"raptor"},{"n":"Aquila clanga","c":"Greater Spotted Eagle","t":"raptor"},{"n":"Aquila rapax","c":"Tawny Eagle","t":"raptor"},{"n":"Aquila nipalensis","c":"Steppe Eagle","t":"raptor"},{"n":"Aquila heliaca","c":"Eastern Imperial Eagle","t":"raptor"},{"n":"Aquila fasciata","c":"Bonelli's Eagle","t":"raptor"},{"n":"Hieraaetus pennatus","c":"Booted Eagle","t":"raptor"},{"n":"Ardeotis nigriceps","c":"Great Indian Bustard","t":"otidiformes,large bird"},{"n":"Chlamydotis macqueenii","c":"Macqueen's Bustard","t":"otidiformes,large bird"},{"n":"Podiceps nigricollis","c":"Black-necked Grebe","t":"fowl"},{"n":"Podiceps cristatus","c":"Great-crested Grebe","t":"fowl"},{"n":"Tachybaptus ruficollis","c":"Little Grebe","t":"fowl"},{"n":"Buteo rufinus","c":"Long-legged Buzzard","t":"raptor"},{"n":"Gyps bengalensis","c":"White-rumped Vulture","t":"raptor"},{"n":"Haliaeetus leucoryphus","c":"Pallas's Fish Eagle","t":"raptor"},{"n":"Accipiter virgatus","c":"Besra","t":"raptor"},{"n":"Turnix suscitator","c":"Barred Buttonquail","t":"fowl"},{"n":"Porphyrio porphyrio","c":"Purple Swamphen","t":"seabird"},{"n":"Gallinula chloropus","c":"Common Moorhen","t":"fowl"},{"n":"Fulica atra","c":"Eurasian Coot","t":"waterbird"},{"n":"Grus virgo","c":"Demoiselle Crane","t":"wader"},{"n":"Grus leucogeranus","c":"Siberian Crane","t":"wader"},{"n":"Grus grus","c":"Common Crane","t":"wader"},{"n":"Grus antigone","c":"Sarus Crane","t":"wader"},{"n":"Esacus recurvirostris","c":"Great Thick-knee","t":"wader"},{"n":"Hydrophasianus chirurgus","c":"Pheasant-tailed Jacana","t":"wader"},{"n":"Metopidius indicus","c":"Bronze-winged Jacana","t":"wader"},{"n":"Himantopus himantopus","c":"Black-winged Stilt","t":"wader"},{"n":"Recurvirostra avosetta","c":"Pied Avocet","t":"wader"},{"n":"Vanellus vanellus","c":"Northern Lapwing","t":"wader"},{"n":"Vanellus malabaricus","c":"Yellow-wattled Lapwing","t":"wader"},{"n":"Vanellus indicus","c":"Red-wattled Lapwing","t":"wader"},{"n":"Vanellus gregarius","c":"Sociable Lapwing","t":"wader"},{"n":"Vanellus leucurus","c":"White-tailed Lapwing","t":"wader"},{"n":"Pluvialis fulva","c":"Pacific Golden Plover","t":"wader"},{"n":"Pluvialis squatarola","c":"Grey Plover","t":"wader"},{"n":"Pluvialis apricaria","c":"European Golden Plover","t":"wader"},{"n":"Charadrius asiaticus","c":"Caspian Plover","t":"wader"},{"n":"Charadrius hiaticula","c":"Common Ringed Plover","t":"wader"},{"n":"Charadrius dubius","c":"Little Ringed Plover","t":"wader"},{"n":"Amaurornis akool","c":"Brown Crake","t":"waterbird"},{"n":"Amaurornis phoenicurus","c":"White-breasted Waterhen","t":"waterbird"},{"n":"Porzana pusilla","c":"Baillon's Crake","t":"waterbird"},{"n":"Orthotomus sutorius","c":"Common Tailorbird","t":"passerine"},{"n":"Sousa plumbea","c":"Indian Ocean humpback dolphin","t":"aquatic"},{"n":"Acrocephalus aedon","c":"Thick-billed Warbler","t":" passerine"},{"n":"Acrocephalus melanopogon","c":"Moustached Warbler","t":"passerine"},{"n":"Philomachus pugnax","c":"Ruff","t":"wader"},{"n":"Phalaropus lobatus","c":"Red-necked Phalarope","t":"wader"},{"n":"Lymnocryptes minimus","c":"Jack Snipe","t":"wader"},{"n":"Gallinago stenura","c":"Pin-tailed Snipe","t":"wader"},{"n":"Gallinago gallinago","c":"Common Snipe","t":"wader"},{"n":"Limosa limosa","c":"Black-tailed Godwit","t":"wader"},{"n":"Limosa lapponica","c":"Bar-tailed Godwit","t":"wader"},{"n":"Numenius phaeopus","c":"Whimbre","t":"wader"},{"n":"Numenius arquata","c":"Eurasian Curlew","t":"wader"},{"n":"Tringa erythropus","c":"Spotted Redshank","t":"wader"},{"n":"Tringa totanus","c":"Common Redshank","t":"wader"},{"n":"Tringa stagnatilis","c":"Marsh Sandpiper","t":"wader"},{"n":"Tringa nebularia","c":"Common Greenshank","t":"wader"},{"n":"Tringa ochropus","c":"Green Sandpiper","t":"wader"},{"n":"Tringa glareola","c":"Wood Sandpiper","t":"wader"},{"n":"Xenus cinereus","c":"Terek Sandpiper","t":"wader"},{"n":"Actitis hypoleucos","c":"Common Sandpiper","t":"wader"},{"n":"Arenaria interpres","c":"Ruddy Turnstone","t":"wader"},{"n":"Calidris tenuirostris","c":"Great Knot","t":"wader"},{"n":"Calidris canutus","c":"Red Knot","t":"wader"},{"n":"Calidris ruficollis","c":"Red-necked Stint","t":"wader"},{"n":"Calidris minuta","c":"Little Stint","t":"wader"},{"n":"Calidris temminnckii","c":"Temminck's Stint","t":"wader"},{"n":"Calidris alba","c":"Sanderling","t":"wader"},{"n":"Calidris ferruginea","c":"Curlew Sandpiper","t":"wader"},{"n":"Calidris alpina","c":"Dunlin","t":"wader"},{"n":"Limicola falcinellus","c":"Broad-billed Sandpiper","t":"wader"},{"n":"Pterocles orientalis","c":"Black-bellied Sandgrouse","t":"fowl"},{"n":"Cursorius cursor","c":"Cream-coloured Courser","t":"wader"},{"n":"Glareola pratincola","c":"Collared Pratincole","t":"wader"},{"n":"Glareola lactea","c":"Small Pratincole","t":"wader"},{"n":"Larus cachinnans cachinnans","c":"Caspian Gull","t":"seabird"},{"n":"Larus heuglini heuglin","c":"Heuglin's Gull","t":"seabird"},{"n":"Ichthyaetus ichthyaetus","c":"Pallas's Gull","t":"seabird"},{"n":"Larus canus","c":"Mew Gull","t":"seabird"},{"n":"Chroicocephalus brunnicephalus","c":"Brown-headed Gull","t":"seabird"},{"n":"Chroicocephalus ridibundus","c":"Black-headed Gull","t":"seabird"},{"n":"Chroicocephalus genei","c":"Slender-billed Gull","t":"seabird"},{"n":"Hydrocoloeus minutus","c":"Little Gull","t":"seabird"},{"n":"Gelochelidon nilotica","c":"Gull-billed Tern","t":"seabird"},{"n":"Hydroprogne caspia","c":"Caspian Tern","t":"seabird"},{"n":"Thalasseus bengalensis","c":"Lesser Crested Tern","t":"seabird"},{"n":"Cursorius coramandelicus","c":"Indian Courser","t":"wader"},{"n":"Thalasseus sandvicensis","c":"Sandwich Tern","t":"seabird"},{"n":"Sterna aurantia","c":"River Tern","t":"seabird"},{"n":"Sterna hirundo","c":"Common Tern","t":"seabird"},{"n":"Sterna repressa","c":"White-cheeked Tern","t":"seabird"},{"n":"Sternula albifrons","c":"Little Tern","t":"seabird"},{"n":"Sternula saundersi","c":"Saunders's Tern","t":"seabird"},{"n":"Chlidonias hybrida","c":"Whiskered Tern","t":"seabird"},{"n":"Chlidonias leucopterus","c":"White-winged Black Tern","t":"seabird"},{"n":"Anous stolidus","c":"Brown Noddy","t":"seabird"},{"n":"Rynchops albicollis","c":"Indian Skimmer","t":"seabird"},{"n":"Stercorarius parasiticus","c":"Arctic Skua","t":"seabird"},{"n":"Pterocles exustus","c":"Chestnut-bellied Sandgrouse","t":"fowl"},{"n":"Pterocles senegallus","c":"Spotted Sandgrouse","t":"fowl"},{"n":"Thalasseus bergii","c":"Greater Crested Tern","t":"seabird"},{"n":"Glareola maldivarum","c":"Oriental Pratincole","t":"wader"},{"n":"Columba livia","c":"Common Pigeon","t":"passerine"},{"n":"Columba eversmanni","c":"Yellow-eyed Pigeon","t":"passerine"},{"n":"Tyto alba","c":"Barn Owl","t":"raptor"},{"n":"Streptopelia decaocta","c":"Eurasian Collared Dove","t":"passerine"},{"n":"Streptopelia tranquebarica","c":"Red Collared Dove","t":"passerine"},{"n":"Streptopelia chinensis","c":"Spotted Dove","t":"passerine"},{"n":"Streptopelia senegalensis","c":"Laughing Dove","t":"passerine"},{"n":"Psittacula krameri","c":"Rose-ringed Parakeet","t":"passerine"},{"n":"Psittacula cyanocephala","c":"Plum-headed Parakeet","t":"passerine"},{"n":"Clamator jacobinus","c":"Jacobin Cuckoo","t":"passerine"},{"n":"Hierococcyx varius","c":"Common Hawk Cuckoo","t":"passerine"},{"n":"Cuculus canorus","c":"Eurasian Cuckoo","t":"passerine"},{"n":"Cacomantis passerinus","c":"Grey-bellied Cuckoo","t":"passerine"},{"n":"Eudynamys scolopaceus","c":"Asian Koel","t":"passerine"},{"n":"Coracias benghalensis","c":"Indian Roller","t":"passerine"},{"n":"Taccocua leschenaultia","c":"Sirkeer Malkoha","t":"passerine"},{"n":"Upupa epops","c":"Common Hoopoe","t":"passerine"},{"n":"Asio flammeus","c":"Short-eared Owl","t":"raptor"},{"n":"Otus brucei","c":"Pallid Scops Owl","t":"raptor"},{"n":"Athene brama","c":"Spotted Owlet","t":"raptor"},{"n":"Bubo bengalensis","c":"Indian Eagle Owl","t":"raptor"},{"n":"Strix leptogrammica","c":"Brown Wood Owl","t":"raptor"},{"n":"Caprimulgus europaeus","c":"European Nightjar","t":"passerine"},{"n":"Caprimulgus mahrattensis","c":"Sykes's Nightjar","t":"passerine"},{"n":"Caprimulgus macrurus","c":"Large-tailed Nightjar","t":"passerine"},{"n":"Caprimulgus asiaticus","c":"Indian Nightjar","t":"passerine"},{"n":"Caprimulgus affinis","c":"Savanna Nightjar","t":"passerine"},{"n":"Tachymarptis melba","c":"Alpine Swift","t":"fowl"},{"n":"Asio otus","c":"Long-eared Owl","t":"raptor"},{"n":"Parus nuchalis","c":"White-naped Tit","t":"passerine"},{"n":"Coracias garrulus","c":"European Roller","t":"passerine"},{"n":"Corvus ruficollis","c":"Brown-necked Raven","t":"passerine"},{"n":"Halcyon pileata","c":"Black-capped Kingfisher","t":"passerine"},{"n":"Alcedo atthis","c":"Common Kingfisher","t":"passerine"},{"n":"Ceryle rudis","c":"Pied Kingfisher","t":"passerine"},{"n":"Merops persicus","c":"Blue-cheeked Bee-eater","t":"passerine"},{"n":"Merops philippinus","c":"Blue-tailed Bee-eater","t":"passerine"},{"n":"Megalaima haemacephala","c":"Coppersmith Barbet","t":"passerine"},{"n":"Jynx torquilla","c":"Eurasian Wryneck","t":"passerine"},{"n":"Dendrocopus mahrattensis","c":"Yellow-crowned Woodpecker","t":"passerine"},{"n":"Coracina melanoptera","c":"Black-headed Cuckooshrike","t":"passerine"},{"n":"Pericrocotus erythropygius","c":"White-bellied Minivet","t":"passerine"},{"n":"Pericrocotus cinnamomeus","c":"Small Minivet","t":"passerine"},{"n":"Pericrocotus speciosus","c":"Scarlet Minivet","t":"passerine"},{"n":"Halcyon smyrnensis","c":"White-throated Kingfisher","t":"passerine"},{"n":"Lanius collurio","c":"Red-backed Shrike","t":"passerine"},{"n":"Lanius vittatus","c":"Bay-backed Shrike","t":"passerine"},{"n":"Lanius schach","c":"Long-tailed Shrike","t":"passerine"},{"n":"Lanius meridionalis","c":"Southern Grey Shrike","t":"passerine"},{"n":"Lanius pallidirostris","c":"Steppe Grey Shrike","t":"passerine"},{"n":"Dicrurus hottentottus","c":"Spangled Drongo","t":"passerine"},{"n":"Dicrurus macrocercus","c":"Black Drongo","t":"passerine,raptor"},{"n":"Dicrurus leucophaeus","c":"Ashy Drongo","t":"passerine"},{"n":"Dicrurus caerulescens","c":"White-bellied Drongo","t":"passerine"},{"n":"Oriolus chinensis","c":"Black-naped Oriole","t":"passerine"},{"n":"Rhipidura aureola","c":"White-browed Fantail","t":"passerine"},{"n":"Hypothymis azurea","c":"Black-naped Monarch","t":"passerine"},{"n":"Dendrocitta vagabunda","c":"Rufous Treepie","t":"passerine"},{"n":"Lanius phoenicuroides","c":"Red-tailed Shrike","t":"passerine"},{"n":"Pterocles indicus","c":"Painted Sandgrouse","t":"fowl"},{"n":"Riparia paludicola","c":"Plain Martin","t":"passerine"},{"n":"Riparia riparia","c":"Sand Martin","t":"passerine"},{"n":"Hirundo smithii","c":"Wire-tailed Swallow","t":"passerine"},{"n":"Hirundo rustica","c":"Barn Swallow","t":"passerine"},{"n":"Cercopis daurica","c":"Red-rumped Swallow","t":"passerine"},{"n":"Mirafra cantillans","c":"Singing Bushlark","t":"passerine"},{"n":"Mirafra erythroptera","c":"Indian Bushlark","t":"passerine"},{"n":"Alaemon alaudipes","c":"Greater Hoopoe Lark","t":"passerine"},{"n":"Melanocorypha bimaculata","c":"Bimaculated Lark","t":"passerine"},{"n":"Ammomanes phoenicura","c":"Rufous-tailed Lark","t":"passerine"},{"n":"Ammomanes deserti","c":"Desert Lark","t":"passerine"},{"n":"Calandrella brachydactyla","c":"Greater Short-toed Lark","t":"passerine"},{"n":"Calandrella acutirostris","c":"Hume's Short-toed Lark","t":"passerine"},{"n":"Calandrella raytal","c":"Sand Lark","t":"passerine"},{"n":"Petrochelidon flavicola","c":"Streak-throated Swallow","t":"passerine"},{"n":"Eremopterix nigriceps","c":"Black-crowned Sparrow Lark","t":"passerine"},{"n":"Galerida cristata","c":"Crested Lark","t":"passerine"},{"n":"Galerida deva","c":"Sykes's Lark","t":"passerine"},{"n":"Alauda gulgula","c":"Oriental Skylark","t":"passerine"},{"n":"Hypocolius ampelinus","c":"Grey Hypocolius","t":"passerine"},{"n":"Pycnonotus leucotis","c":"White-eared Bulbul","t":"passerine"},{"n":"Pycnonotus cafer","c":"Red-vented Bulbul","t":"passerine"},{"n":"Prinia hodgsonii","c":"Grey-breasted Prinia","t":"passerine"},{"n":"Prinia gracilis","c":"Graceful Prinia","t":"passerine"},{"n":"Prinia sylvatica","c":"Jungle Prinia","t":"passerine"},{"n":"Prinia socialis","c":"Ashy Prinia","t":"passerine"},{"n":"Prinia inornata","c":"Plain Prinia","t":"passerine"},{"n":"Turdus obscurus","c":"Eyebrowed Thrush","t":"passerine"},{"n":"Eremopterix griseus","c":"Ashy-crowned Sparrow Lark","t":"passerine"},{"n":"Turdus atrogularis","c":"Black-throated Thrush","t":"passerine"},{"n":"Ptyonoprogne concolor","c":"Dusky Crag Martin","t":"passerine"},{"n":"Rostratula benghalensis","c":"Greater Painted-snipe","t":"wader"},{"n":"Acrocephalus agricola","c":"Paddyfield Warbler","t":"passerine"},{"n":"Acrocephalus dumetorum","c":"Blyth's Reed Warbler","t":"passerine"},{"n":"Iduna caligata","c":"Booted Warbler","t":"passerine"},{"n":"Iduna rama","c":"Sykes's Warbler","t":"passerine"},{"n":"Phylloscopus collybita","c":"Common Chiffchaff","t":"passerine"},{"n":"Phylloscopus trochiloides","c":"Greenish Leaf Warbler","t":"passerine"},{"n":"Phylloscopus nitidus","c":"Green Warbler","t":"passerine"},{"n":"Phylloscopus magnirostris","c":"Large-billed Leaf Warbler","t":"passerine"},{"n":"Sylvia curruca","c":"Lesser Whitethroat","t":"passerine"},{"n":"Sylvia minula","c":"Desert Whitethroat","t":"passerine"},{"n":"Sylvia althaea","c":"Hume's Whitethroat","t":"passerine"},{"n":"Sylvia hortensis","c":"Orphean Warbler","t":"passerine"},{"n":"Prinia buchanani","c":"Rufous-fronted Prinia","t":"passerine"},{"n":"Sylvia nana","c":"Asian Desert Warbler","t":"passerine"},{"n":"Turdoides caudata","c":"Common Babbler","t":"passerine"},{"n":"Turdoides malcolmi","c":"Large Grey Babbler","t":"passerine"},{"n":"Turdoides striata","c":"Jungle Babbler","t":"passerine"},{"n":"Acridotheres fuscus","c":"Jungle Myna","t":"passerine"},{"n":"Acridotheres ginginianus","c":"Bank Myna","t":"passerine"},{"n":"Acridotheres tristis","c":"Common Myna","t":"passerine"},{"n":"Sturnia pagodarum","c":"Brahminy Starling","t":"passerine"},{"n":"Pastor roseus","c":"Rosy Starling","t":"passerine"},{"n":"Sturnus vulgaris","c":"Common Starling","t":"passerine"},{"n":"Turdus unicolor","c":"Tickell's Thrush","t":"passerine"},{"n":"Chaetornis striatus","c":"Bristled Grassbird","t":"passerine"},{"n":"Cisticola juncidis","c":"Zitting Cisticola","t":"passerine"},{"n":"Sylvia communis","c":"Common Whitethroat","t":"passerine"},{"n":"Turdus viscivorus","c":"Mistle Thrush","t":"fowl,seabird"},{"n":"Luscinia svecica","c":"Bluethroat","t":"passerine"},{"n":"Carpospiza brachydactyla","c":"Pale Rock Sparrow","t":"passerine"},{"n":"Copsychus saularis","c":"Oriental Magpie Robin","t":"passerine"},{"n":"Saxicoloides fulicatus","c":"Indian Robin","t":"passerine"},{"n":"Phoenicurus ochrurus","c":"Black Redstart","t":"passerine"},{"n":"Saxicola macrorhynchus","c":"Stoliczka's Bushchat","t":"passerine"},{"n":"Saxicola torquatus","c":"Common Stonechat","t":"passerine"},{"n":"Saxicola caprata","c":"Pied Bushchat","t":"passerine"},{"n":"Oenanthe isabellina","c":"Isabelline Wheatear","t":"passerine"},{"n":"Oenanthe oenanthe","c":"Northern Wheatear","t":"passerine"},{"n":"Oenanthe chrysopygia","c":"Red-tailed Wheatear","t":"passerine"},{"n":"Oenanthe deserti","c":"Desert Wheatear","t":"passerine"},{"n":"Oenanthe picata","c":"Variable Wheatear","t":"passerine"},{"n":"Oenanthe albonigra","c":"Hume's Wheatear","t":"passerine"},{"n":"Cercotrichas galactotes","c":"Rufous-tailed Scrub Robin","t":"passerine"},{"n":"Passer domesticus","c":"House Sparrow","t":"passerine"},{"n":"Monticola solitarius","c":"Blue Rock Thrush","t":"passerine"},{"n":"Monticola saxatilis","c":"Rufous-tailed Rock Thrush","t":"passerine"},{"n":"Muscicapa striata","c":"Spotted Flycatcher","t":"passerine"},{"n":"Muscicapa muttui","c":"Brown-breasted Flycatcher","t":"passerine"},{"n":"Ficedula parva","c":"Red-breasted Flycatcher","t":"passerine"},{"n":"Ficedula superciliaris","c":"Ultramarine Flycatcher","t":"passerine"},{"n":"Eumyias thalassinus","c":"Verditer Flycatcher","t":"passerine"},{"n":"Cyornis tickelliae","c":"Tickell's Blue Flycatcher","t":"passerine"},{"n":"Culicicapa ceylonensis","c":"Grey-headed Canary Flycatcher","t":"passerine"},{"n":"Cinnyris asiaticus","c":"Purple Sunbird","t":"passerine"},{"n":"Aethopyga vigorsii","c":"Vigor's Sunbird","t":"passerine"},{"n":"Riparia diluta","c":"Pale Martin","t":"passerine"},{"n":"Cercomela fusca","c":"Brown Rock Chat","t":"passerine"},{"n":"Oenanthe monacha","c":"Hooded Wheatear","t":"passerine"},{"n":"Passer hispaniolensis","c":"Spanish Sparrow","t":"passerine"},{"n":"Passer pyrrhonotus","c":"Sind Sparrow","t":"passerine"},{"n":"Ploceus benghalensis","c":"Black-breasted Weaver","t":"passerine"},{"n":"Ploceus philippinus","c":"Baya Weaver","t":"passerine"},{"n":"Euodice malabarica","c":"Indian Silverbill","t":"passerine"},{"n":"Lonchura punctulata","c":"Scaly-breasted Munia","t":"passerine"},{"n":"Lonchura malacca","c":"Black-headed Munia","t":"passerine"},{"n":"Motacilla flava","c":"Yellow Wagtail","t":"passerine"},{"n":"Motacilla citreola","c":"Citrine wagtail","t":"passerine"},{"n":"Dendronanthus indicus","c":"Forest Wagtail","t":"passerine"},{"n":"Motacilla cinerea","c":"Grey Wagtail","t":"passerine"},{"n":"Motacilla alba","c":"White Wagtail","t":"passerine"},{"n":"Motacilla maderaspatensis","c":"White-browed Wagtail","t":"passerine"},{"n":"Anthus rufulus","c":"Paddyfield Pipit","t":"passerine"},{"n":"Anthus campestris","c":"Tawny Pipit","t":"passerine"},{"n":"Anthus similis","c":"Long-billed Pipit","t":"passerine"},{"n":"Anthus trivialis","c":"Tree Pipit","t":"passerine"},{"n":"Anthus cervinus","c":"Red-throated Pipit","t":"passerine"},{"n":"Anthus spinoletta","c":"Water Pipit","t":"passerine,raptor"},{"n":"Bucanetes githagineus","c":"Trumpeter Finch","t":"passerine"},{"n":"Eremopsaltria mongolica","c":"Mongolian Finch","t":"passerine"},{"n":"Carpodacus erythrinus","c":"Common Rosefinch","t":"passerine"},{"n":"Emberiza cia","c":"Rock Bunting","t":"passerine"},{"n":"Emberiza stewarti","c":"White-capped Bunting","t":"passerine"},{"n":"Emberiza striolata","c":"Striolated Bunting","t":"passerine"},{"n":"Emberiza buchanani","c":"Grey-necked Bunting","t":"passerine"},{"n":"Emberiza fucata","c":"Chestnut-eared Bunting","t":"passerine"},{"n":"Emberiza melanocephala","c":"Black-headed Bunting","t":"passerine"},{"n":"Gymnoris xanthocollis","c":"Chestnut-shouldered Petronia","t":"passerine"},{"n":"Acrocephalus stentoreus","c":"Clamorous Reed Warbler","t":"passerine"},{"n":"Felis lybica ornata","c":"Asiatic wildcat","t":"felis"},{"n":"Vulpes vulpes pusilla","c":"white-footed fox","t":"canid"},{"n":"Vulpes cana","c":"Blanford's Fox","t":"canid"},{"n":"Suncus stoliczkanus","c":"Anderson's Shrew","t":""},{"n":"Delphinus delphis","c":"Common Dolphin","t":"aquatic"},{"n":"Balaenoptera borealis","c":"Sei Whale","t":"aquatic"},{"n":"Millardia meltada","c":"Soft-furred Field Rat","t":"rodent"},{"n":"Cremnomys cutchicus","c":"Cutch rat","t":"rodent"},{"n":"Mus saxicola","c":"rock-loving mouse","t":"rodent"},{"n":"Taphozous melanopogon","c":"Black-bearded tomb bat","t":"bat"},{"n":"Taphozous nudiventris","c":"Naked-rumped tomb bat","t":"bat"},{"n":"Hipposideros fulvus","c":"Fulvus roundleaf bat","t":"bat"},{"n":"Hipposideros bicolor","c":"Bicolored roundleaf bat","t":"bat"},{"n":"Rhinolophus lepidus","c":"Blyth's horseshoe bat","t":"bat"},{"n":"Tadarida aegyptiaca","c":"Egyptian free-tailed bat","t":"bat"},{"n":"Scotozous dormeri","c":"Dormer's bat","t":"bat"},{"n":"Scotophilus kuhlii","c":"Lesser Asiatic yellow bat","t":"bat"},{"n":"Elachistodon westermanni","c":"Indian egg-eating snake","t":"snake"}]

    window.idx = lunr(function () {
        this.ref('id');
        this.field('n');
        this.field('c');
        this.field('t');

        for (var i = 0; i < data.length; ++i) {
            this.add($.extend({ "id": i }, data[i]));
        }
    });

    function display_search_results(results) {
        var $search_results = $("#results");
        if (results.length) {
            $search_results.empty();
            results.forEach(function (result) {
                var rdata = data[result.ref];
                var appendString =
                    '<div class="col-sm-3 col-md-3 col-xl-2 gal-item"><a class="gal-img gal-item-h1" href="/Species/' +
                    rdata.n +
                    '"><img class="img--bg" src="/assets/imgdata/thumb/' +
                    rdata.n +
                    '.jpg" /><div class="gal-text"><span>' +
                    rdata.n +
                    '</span><span>' +
                    rdata.c +
                    '</span></div></a></div>';
                $search_results.append(appendString);
            });

            $(".img--bg").error(function () {
                this.src = "/assets/img/missing.png";
            });
        } else {
            $search_results.html('<p class="my-5 py-5">No results found.</p>');
        }
    }
    function submitSearch() {
        event.preventDefault();
        var q = $("#supersearch").val();

        if (q.length > 2) {

            var query;

            switch ($("#searchOptions").val()) {

                case "0": query = q + "*"; break;
                case "1": query = "*" + q; break;
                case "2": query = "*" + q + "*"; break;
                case "3": query = q + "~2"; break;
                case "4": query = q + "~6"; break;
                default: query = q; break;
            }

            var results = window.idx.search(query);
            display_search_results(results);
        } else {
            noSearch();
        }
    }
});