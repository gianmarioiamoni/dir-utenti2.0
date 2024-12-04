import Link from "next/link";

export default function Custom404(): JSX.Element {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center">
            {/* Illustrazione */}
            <div className="text-2xl font-bold text-foreground mb-8">
                <h1> Errore 404 </h1>
            </div>

            {/* Messaggio principale */}
            <h1 className="text-4xl font-bold text-foreground mb-4">
                Ops! Utente non trovato.
            </h1>
            <p className="text-lg text-foreground mb-8">
                Sembra che tu abbia preso un vicolo cieco nella directory.
                <br />
                Ma non preoccuparti, possiamo riportarti sulla retta via!
            </p>

            {/* Pulsanti di azione */}
            <div className="flex gap-4">
                <Link href="/" className="btn-primary">
                   Torna alla Home 
                </Link>
            </div>
        </div>
    );
}
