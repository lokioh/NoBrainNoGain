import java.util.Random;

public class Sudoku {
    private int[] tab; // valeurs
    private int sizex, sizey; // taille du tableau
    private int bandx, bandy; // taille des bandes
    private int nbSymbols; // nombre de 'chiffres'


    public Sudoku(int sizex, int sizey, int bandx, int bandy) throws Exception {
        this.sizex = sizex;
        this.sizey = sizey;

        this.bandx = bandx;
        this.bandy = bandy;

        if (sizex % bandx != 0 || sizey % bandy != 0) // assure que la taille du tableau soit un multiple de celle des
                                                        // bandes
            throw new Exception("taille de bande invalide");

        this.nbSymbols = sizex > sizey ? sizex : sizey;
        this.nbSymbols = this.nbSymbols > bandx * bandy ? this.nbSymbols : bandx * bandy;
        // definis le nombre de symbole en fonction des la taille des case et celle du
        // tableau

        this.tab = new int[sizex * sizex];
    }

    public Sudoku() throws Exception {
        this(9, 9, 3, 3); // crée un sudoku normal 9x9
    }

    // retourne la valeur a la case c
    public int valeurEn(int c) {
        return tab[c];
    }

    // retourne true si le tableau est complet et san erreur
    public boolean estFini() {
        for (int i = 0; i < sizex * sizey; i++) {
            if (valeurEn(i) == 0)
                return false;
            else if (valeurPossible(valeurEn(i), i))
                return false;
        }
        return true;
    }

    // c - nombre; n - case
    public boolean valeurPossible(int c, int n) {
        // retourne true pour effacer une valeur
        if (c == 0)
            return true;

        // retourne faux si le symbole n'existe pas
        if (c > nbSymbols)
            return false;

        // retourne false si la case est en dehord du tableau
        if (n >= sizex * sizey)
            return false;

        // calcule la position sous forme (x, y)
        int posx = n % sizex;
        int posy = (n - posx) / sizey;

        // regarde la ligne
        for (int i = 0; i < sizex; i++)
            if (valeurEn(i + (posy * sizex)) == c && !(i + (posy * sizex) == n))
                return false;

        // regardes la colonne
        for (int i = 0; i < sizey; i++)
            if (valeurEn(posx + (i * sizex)) == c && !(posx + (i * sizex) == n))
                return false;

        // regarde la case (3*3 dans un 9*9)
        int posbandx = posx - (posx % bandx);
        int posbandy = posy - (posy % bandy);
        for (int i = 0; i < bandx * bandy; i++)
            if (valeurEn(posbandx + (i % bandx) + (posbandy + ((i - (i % bandx)) / bandy)) * sizex) == c)
                return false;

        return true;
    }

    public void resoudre(int n) {
        if (valeurEn(n) == 0) {
            int i = 1; // initialise a 1
            while (i <= nbSymbols && !estFini()) { // pour chaque valeur possible du tableau
                if (valeurPossible(i, n)) { // si la valeur ne contradit pas une autre case
                    tab[n] = i; // mettre la case a la valeur i

                    // vas a la prochaine case ou s'arrête si le tableau est parcouru
                    if (n + 1 == sizex * sizey)
                        return;
                    // résou la prochaine case
                    resoudre(n + 1);
                }
                i++;

            }

            // efface la case si le tableau n'est pas fini
            if (!estFini()) {
                tab[n] = 0;
            }
        } else {
           if (n + 1 < sizex * sizey)
               resoudre(n + 1);
        }
    }

    public void resoudre(){
        resoudre(0);
    }

    public void creer(int aEnlever) {
        // initialise le tableau
        this.tab = new int[sizex * sizex];

        do {
            // met les cases du tableau a 0
            for (int i = 0; i < sizex * sizex; i++) {
                tab[i] = 0;
            }

            // met des nombre aléatoires dans le tableau
            Random rd = new Random();
            int i = 0;
            while (i < ((sizex * sizey > 2 * nbSymbols) ? (nbSymbols * 2) - 1 : (nbSymbols))) {
                int n = rd.nextInt(sizex * sizey);
                if (valeurPossible((i % nbSymbols) + 1, n)) {
                    tab[n] = (i % nbSymbols) + 1;
                    i++;
                }
            }

            // commencer le backtracking
            resoudre();
        } while (!estFini());

        // enleve des cases aléatoires
        Random rd = new Random();
        int nbEnleve = 0;
        int tries = 0;
        while (nbEnleve < aEnlever && tries < 100) {
            int n = rd.nextInt(sizex * sizey); // choisis une case non nulle
            while (valeurEn(n) == 0)
                n = rd.nextInt(sizex * sizey);

            int l = 0;
            for (int i = 0; i < nbSymbols; i++) { // verifique que la case as une unique solution
                if (valeurPossible(i, n))
                    l++;
            }
            if (l > 2)
                tries++; // pour eviter une boucle infinie
            else { // efface le nombre
                tab[n] = 0;
                nbEnleve++;
            }

        }

    }

    public void creer() { // crée avec ⅔ des chiffres enlevés
        creer((sizex * sizey * 2) / 3);
    }

    public String toString() {
        String res = "";
        for (int i = 0; i < sizex * sizey; i++) {
            if (i % sizex > 0) {
                if (i % bandx == 0)
                    res += "|";
            } else if (i > 0) {
                if ((i / sizex) % bandy == 0 && i > 0) {
                    res += "\n-";
                    for (int j = 1; j < sizex; j++) {
                        if (j % bandx == 0)
                            res += "+";
                        res += "-";
                    }
                }
                res += "\n";
            }
            res += (valeurEn(i) == 0) ? " " : (valeurEn(i) < 10 ? valeurEn(i) : ((char) (valeurEn(i) + 55)));
        }
        return res;
    }

    public static void main(String[] args) {
        Sudoku res;
        try {
            res = new Sudoku();
        } catch (Exception e) {
            System.out.println("erreur: taille invalide");
            return;
        }
        res.tab[11] = 1;
        res.creer();
        System.out.println(res);
        res.resoudre(0);
        System.out.println(res);
    }
}