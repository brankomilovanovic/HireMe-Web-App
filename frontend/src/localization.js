import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    sr: {
        months: {
            january: 'Januar',
            february: 'Februar',
            march: 'Mart',
            april: 'Abril',
            may: 'Maj',
            june: 'Jun',
            july: 'Jul',
            august: 'Avgust',
            september: 'Septembar',
            oktober: 'Oktobar',
            november: 'Novembar',
            december: 'Decembar'
        },
        constants: {
            shifts: {
                morningShift: 'Jutarnja smena',
                afternoonShift: 'Popodnevna smena',
                nightShift: 'Vecernja smena'
            },
            adStatus: {
                active: 'Aktivni',
                inactive: 'Neaktivni'
            },
            jobType: {
                fullTime: 'Puno radno vreme',
                partTime: 'Polu radno vreme (honorarno)'
            },
            adType: {
                find: 'Trazim radnika/e',
                offer: 'Trazim posao'
            }
        },
        base: {
            name: 'AngazujMe',
            namePart1: 'Angazuj',
            namePart2: 'Me',
            noAdsResults: 'Nema pronadjenih oglasa',
            noSavedAdsResults: 'Nema sacuvanih oglasa',
            profile: {
                profile: 'Profil',
                name: 'Ime',
                surname: 'Prezime',
                email: 'E-Mail',
                username: 'Korisnicko ime',
                password: 'Sifra',
                role: 'Pozicija',
                userType: 'Tip naloga',
                myAccount: 'Moj nalog',
                editAccount: 'Izmeni nalog',
                myAds: 'Moji oglasi',
                myApplications: 'Moje prijave'
            },
            company: {
                companyName: 'Naziv kompanije',
                companyAddress: 'Adresa kompanije'
            },
            individual: {
                individualAddress: 'Adresa'
            },
            table: {
                actions: 'Akcije',
                edit: 'Uredi',
                delete: 'Obrisi'
            },
            filter: {
                sort: {
                    sortType: 'Nacin sortiranja',
                    datetimeDesc: 'Od novijeg prema starijem',
                    datetimeAsc: 'Od starijeg prema novijem',
                }
            },
            role: {
                user: 'Korisnik',
                moderator: 'Moderator',
                admin: 'Admin'
            },
            userType: {
                individual: 'Licni',
                company: 'Kompanija',
            }
        },
        forms: {
            common: {
                save: 'Sacuvaj',
                login: 'Prijavi se',
                logout: 'Odjavi se',
                register: 'Registruj se',
                thisFieldIsRequired: 'Ovo polje je obavezno',
                emailFormatError: 'Unesite tacan format email adrese',
            },
            editUser: {
                title: 'Edit User',
            },
            addUser: {
                title: 'Add User',
            },
            adPlacement: {
                submit: 'Postavi oglas',
                edit: 'Uredi oglas',
                title: 'Naslov',
                description: 'Opis',
                address: 'Adresa',
                shifts: 'Smena',
                workingHours: {
                    fullTime: 'Radni sati (nedeljno)',
                    partTime: 'Radni sati (dnevno)'
                },
                city: 'Grad',
                jobType: 'Tip posla',
                adType: 'Tip oglasa',
                shortDescription: 'Kratak opis (100 slova maksimalno)',
                shortDescriptionInfo: 'Kratak opis o poslu za koji postavljate oglas.\nOvaj opis se prikazuje na Vasem oglasu u listi svih oglasa.',
                salary: {
                    fullTime: 'Plata (RSD)',
                    partTime: 'Dnevnica (RSD)'
                }
            },
            application: {
                aboutYourself: 'Nesto o sebi (opciono)',
                motivationalLetter: 'Motivaciono pismo (opciono)',
            }
        },
        components: {
            FileUpload: {
                upload: 'Otpremi',
                files: 'Fajlovi',
                dragDrop: 'Prevucite neke fajlove ovde ili kliknite da izaberete',
            },
            yesNoDialog: {
                yes: 'Da',
                no: 'Ne',
                confirmDelete: 'Potvrdite brisanje',
                confirmDeleteMessage: 'Da li ste sigurni da zelite obrisati ovo polje?',
            },
            adDetails: {
                application: 'Prijava',
                applicationForJob: 'Prijava za posao',
                cancel: 'Otkazi',
                approved: 'Potvrdi',
                jobType: 'Tip posla',
                jobDescription: 'Opis posla',
                shifts: 'Smene',
                workingHours: {
                    fullTime: 'Radni sati (nedeljno)',
                    partTime: 'Radni sati (dnevno)'
                },
                salary: {
                    fullTime: 'Plata',
                    partTime: 'Dnevnica'
                },
                cancelApplication: 'Otkazi prijavu za posao'
            },
            search: {
                title: 'Pretrazi',
                what: 'Sta',
                where: 'Gde'
            },
            notification: {
                markAllAsRead: 'Oznaci sve kao procitane',
                notRead: 'Neprocitane',
                seeAllNotifications: 'Pogledaj sva obavestenja'
            },
            latestSearch: {
                noAccount: 'Nemate jos uvek nalog?',
                noAccountDescription: 'da bi ste mogli cuvati pretrage.'
            },
            autocomplete: {
                noResults: 'Nema rezultata'
            }
        },
        pages: {
            register: {
                registration: 'Registracija',
                alreadyHaveAccount: 'Vec imate nalog?'
            },
            login: {
                createNewAccount: 'Napravite novi nalog',
                wrongUsernameOrPassword: 'Pogresno korisnicko ime ili sifra',
            },
            home: {
                title: 'Glavna stranica',
                welcome: 'Dobrodosli',
                forYou: 'Za tebe',
                latestSearch: 'Nedavne pretrage',
                saveAds: 'Sacuvani oglasi',
                search: {
                    whatPlaceholder: 'Kljucne reci, naziv radnog mesta ili kompanija',
                    wherePlaceholder: 'Grad ili adresa',
                    errorMessage: 'Unesite naziv posla ili lokaciju da biste pretrazili'
                },
                noApplications: 'Nemate poslatu ni jednu aplikaciju'
            },
            boardUser: {
                title: 'Korisnikova tabla'
            },
            boardModerator: {
                title: 'Moderatova tabla'
            },
            boardAdmin: {
                title: 'Adminova tabla'
            },
            ad: {
                placement: 'Postavi oglas'
            },
            myAds: {
                editAd: 'Uredi oglas',
                applicationList: 'Lista podnetih prijava',
                activate: 'Aktiviraj',
                deactivate: 'Deaktiviraj'
            }
        }
    }
});

export default strings;
