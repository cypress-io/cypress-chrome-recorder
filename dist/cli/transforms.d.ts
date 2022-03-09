export declare const transformDirectory: string;
declare type Flags = {
    force?: boolean;
    dry?: boolean;
    print?: boolean;
};
export declare function runTransforms({ files, flags, }: {
    files: string | string[];
    flags: Flags;
}): any;
export {};
