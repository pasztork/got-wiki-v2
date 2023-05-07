/**
 * Interface for a Character in the "A Song of Ice and Fire" universe.
 */
export interface Character {
    /** 
     * The URL of the character resource.
     */
    url: string;

    /** 
     * The name of the character.
     */
    name: string;

    /**
     * The gender of the character.
     */
    gender: string;

    /** 
     * The culture that the character belongs to. 
     */
    culture: string;

    /**
     * The date of birth of the character.
     */
    born: Date;

    /**
     * The date of death of the character.
     */
    died: Date;

    /**
     * The titles held by the character.
     */
    titles: string[];

    /**
     * The aliases of the character.
     */
    aliases: string[];

    /**
     * The name of the character's father.
     */
    father: string;

    /**
     * The name of the character's mother.
     */
    mother: string;

    /**
     * The name of the character's spouse.
     */
    spouse: string;

    /**
     * The allegiances held by the character.
     */
    allegiances: string[];

    /**
     * The URLs of the books that the character appears in.
     */
    books: string[];

    /**
     * The URLs of the books that the character is a point of view character in.
     */
    povBooks: string[];

    /**
     * The TV series that the character appears in.
     */
    tvSeries: string[];

    /**
     * The actors who played the character in the TV series.
     */
    playedBy: string[];
}
