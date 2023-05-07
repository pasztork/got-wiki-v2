/**
 * Interface for a House in the "A Song of Ice and Fire" universe.
 */
export interface House {
    /**
     * The URL of the resource.
     */
    url: string;

    /**
     * The name of the house.
     */
    name: string;

    /**
     * The region where the house is located.
     */
    region: string;

    /**
     * The coat of arms of the house.
     */
    coatOfArms: string;

    /**
     * The words of the house.
     */
    words: string;

    /**
     * The titles held by members of the house.
     */
    titles: string[];

    /**
     * The seats held by the house.
     */
    seats: string[];

    /**
     * The current lord of the house.
     */
    currentLord: string;

    /**
     * The heir to the house. 
     */
    heir: string;

    /** 
     * The overlord of the house. 
     */
    overlord: string;

    /**
     * The year the house was founded.
     */
    founded: string;

    /**
     * The founder of the house.
     */
    founder: string;

    /** 
     * The year the house died out. 
     */
    diedOut: string;

    /** 
     * The ancestral weapons of the house.
     */
    ancestralWeapons: string[];

    /** 
     * The cadet branches of the house.
     */
    cadetBranches: string[];

    /**
     * The sworn members of the house.
     */
    swornMembers: string[];
}
