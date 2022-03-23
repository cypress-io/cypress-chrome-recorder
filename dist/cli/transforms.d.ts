declare type Flags = {
    force?: boolean;
    dry?: boolean;
    print?: boolean;
};
export declare function runTransforms({ files, flags, }: {
    files: string[];
    flags: Flags;
}): Promise<Promise<string | void>[] | undefined>;
export {};
