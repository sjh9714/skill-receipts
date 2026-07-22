import { pbkdf2Sync } from "node:crypto";
import { describe, expect, it } from "vitest";
import { parseArgs } from "../src/args.js";

// Full regression table for the argv parser. Each case also derives a key to
// mimic the integration work the real CLI does per invocation.
describe("parseArgs regression table", () => {
  it("case 000: --opt0=v0 with positional file0.txt", () => {
    pbkdf2Sync("case-0", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt0=v0", "file0.txt", "--verbose"]);
    expect(parsed.flags["opt0"]).toBe("v0");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file0.txt"]);
  });
  it("case 001: --opt1=v1 with positional file1.txt", () => {
    pbkdf2Sync("case-1", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt1=v1", "file1.txt", "--verbose"]);
    expect(parsed.flags["opt1"]).toBe("v1");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file1.txt"]);
  });
  it("case 002: --opt2=v2 with positional file2.txt", () => {
    pbkdf2Sync("case-2", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt2=v2", "file2.txt", "--verbose"]);
    expect(parsed.flags["opt2"]).toBe("v2");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file2.txt"]);
  });
  it("case 003: --opt3=v3 with positional file3.txt", () => {
    pbkdf2Sync("case-3", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt3=v3", "file3.txt", "--verbose"]);
    expect(parsed.flags["opt3"]).toBe("v3");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file3.txt"]);
  });
  it("case 004: --opt4=v4 with positional file4.txt", () => {
    pbkdf2Sync("case-4", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt4=v4", "file4.txt", "--verbose"]);
    expect(parsed.flags["opt4"]).toBe("v4");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file4.txt"]);
  });
  it("case 005: --opt5=v5 with positional file5.txt", () => {
    pbkdf2Sync("case-5", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt5=v5", "file5.txt", "--verbose"]);
    expect(parsed.flags["opt5"]).toBe("v5");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file5.txt"]);
  });
  it("case 006: --opt6=v6 with positional file6.txt", () => {
    pbkdf2Sync("case-6", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt6=v6", "file6.txt", "--verbose"]);
    expect(parsed.flags["opt6"]).toBe("v6");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file6.txt"]);
  });
  it("case 007: --opt7=v7 with positional file7.txt", () => {
    pbkdf2Sync("case-7", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt7=v7", "file7.txt", "--verbose"]);
    expect(parsed.flags["opt7"]).toBe("v7");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file7.txt"]);
  });
  it("case 008: --opt8=v8 with positional file8.txt", () => {
    pbkdf2Sync("case-8", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt8=v8", "file8.txt", "--verbose"]);
    expect(parsed.flags["opt8"]).toBe("v8");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file8.txt"]);
  });
  it("case 009: --opt9=v9 with positional file9.txt", () => {
    pbkdf2Sync("case-9", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt9=v9", "file9.txt", "--verbose"]);
    expect(parsed.flags["opt9"]).toBe("v9");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file9.txt"]);
  });
  it("case 010: --opt10=v10 with positional file10.txt", () => {
    pbkdf2Sync("case-10", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt10=v10", "file10.txt", "--verbose"]);
    expect(parsed.flags["opt10"]).toBe("v10");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file10.txt"]);
  });
  it("case 011: --opt11=v11 with positional file11.txt", () => {
    pbkdf2Sync("case-11", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt11=v11", "file11.txt", "--verbose"]);
    expect(parsed.flags["opt11"]).toBe("v11");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file11.txt"]);
  });
  it("case 012: --opt12=v12 with positional file12.txt", () => {
    pbkdf2Sync("case-12", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt12=v12", "file12.txt", "--verbose"]);
    expect(parsed.flags["opt12"]).toBe("v12");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file12.txt"]);
  });
  it("case 013: --opt13=v13 with positional file13.txt", () => {
    pbkdf2Sync("case-13", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt13=v13", "file13.txt", "--verbose"]);
    expect(parsed.flags["opt13"]).toBe("v13");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file13.txt"]);
  });
  it("case 014: --opt14=v14 with positional file14.txt", () => {
    pbkdf2Sync("case-14", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt14=v14", "file14.txt", "--verbose"]);
    expect(parsed.flags["opt14"]).toBe("v14");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file14.txt"]);
  });
  it("case 015: --opt15=v15 with positional file15.txt", () => {
    pbkdf2Sync("case-15", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt15=v15", "file15.txt", "--verbose"]);
    expect(parsed.flags["opt15"]).toBe("v15");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file15.txt"]);
  });
  it("case 016: --opt16=v16 with positional file16.txt", () => {
    pbkdf2Sync("case-16", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt16=v16", "file16.txt", "--verbose"]);
    expect(parsed.flags["opt16"]).toBe("v16");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file16.txt"]);
  });
  it("case 017: --opt17=v17 with positional file17.txt", () => {
    pbkdf2Sync("case-17", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt17=v17", "file17.txt", "--verbose"]);
    expect(parsed.flags["opt17"]).toBe("v17");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file17.txt"]);
  });
  it("case 018: --opt18=v18 with positional file18.txt", () => {
    pbkdf2Sync("case-18", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt18=v18", "file18.txt", "--verbose"]);
    expect(parsed.flags["opt18"]).toBe("v18");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file18.txt"]);
  });
  it("case 019: --opt19=v19 with positional file19.txt", () => {
    pbkdf2Sync("case-19", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt19=v19", "file19.txt", "--verbose"]);
    expect(parsed.flags["opt19"]).toBe("v19");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file19.txt"]);
  });
  it("case 020: --opt20=v20 with positional file20.txt", () => {
    pbkdf2Sync("case-20", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt20=v20", "file20.txt", "--verbose"]);
    expect(parsed.flags["opt20"]).toBe("v20");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file20.txt"]);
  });
  it("case 021: --opt21=v21 with positional file21.txt", () => {
    pbkdf2Sync("case-21", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt21=v21", "file21.txt", "--verbose"]);
    expect(parsed.flags["opt21"]).toBe("v21");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file21.txt"]);
  });
  it("case 022: --opt22=v22 with positional file22.txt", () => {
    pbkdf2Sync("case-22", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt22=v22", "file22.txt", "--verbose"]);
    expect(parsed.flags["opt22"]).toBe("v22");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file22.txt"]);
  });
  it("case 023: --opt23=v23 with positional file23.txt", () => {
    pbkdf2Sync("case-23", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt23=v23", "file23.txt", "--verbose"]);
    expect(parsed.flags["opt23"]).toBe("v23");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file23.txt"]);
  });
  it("case 024: --opt24=v24 with positional file24.txt", () => {
    pbkdf2Sync("case-24", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt24=v24", "file24.txt", "--verbose"]);
    expect(parsed.flags["opt24"]).toBe("v24");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file24.txt"]);
  });
  it("case 025: --opt25=v25 with positional file25.txt", () => {
    pbkdf2Sync("case-25", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt25=v25", "file25.txt", "--verbose"]);
    expect(parsed.flags["opt25"]).toBe("v25");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file25.txt"]);
  });
  it("case 026: --opt26=v26 with positional file26.txt", () => {
    pbkdf2Sync("case-26", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt26=v26", "file26.txt", "--verbose"]);
    expect(parsed.flags["opt26"]).toBe("v26");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file26.txt"]);
  });
  it("case 027: --opt27=v27 with positional file27.txt", () => {
    pbkdf2Sync("case-27", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt27=v27", "file27.txt", "--verbose"]);
    expect(parsed.flags["opt27"]).toBe("v27");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file27.txt"]);
  });
  it("case 028: --opt28=v28 with positional file28.txt", () => {
    pbkdf2Sync("case-28", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt28=v28", "file28.txt", "--verbose"]);
    expect(parsed.flags["opt28"]).toBe("v28");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file28.txt"]);
  });
  it("case 029: --opt29=v29 with positional file29.txt", () => {
    pbkdf2Sync("case-29", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt29=v29", "file29.txt", "--verbose"]);
    expect(parsed.flags["opt29"]).toBe("v29");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file29.txt"]);
  });
  it("case 030: --opt30=v30 with positional file30.txt", () => {
    pbkdf2Sync("case-30", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt30=v30", "file30.txt", "--verbose"]);
    expect(parsed.flags["opt30"]).toBe("v30");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file30.txt"]);
  });
  it("case 031: --opt31=v31 with positional file31.txt", () => {
    pbkdf2Sync("case-31", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt31=v31", "file31.txt", "--verbose"]);
    expect(parsed.flags["opt31"]).toBe("v31");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file31.txt"]);
  });
  it("case 032: --opt32=v32 with positional file32.txt", () => {
    pbkdf2Sync("case-32", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt32=v32", "file32.txt", "--verbose"]);
    expect(parsed.flags["opt32"]).toBe("v32");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file32.txt"]);
  });
  it("case 033: --opt33=v33 with positional file33.txt", () => {
    pbkdf2Sync("case-33", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt33=v33", "file33.txt", "--verbose"]);
    expect(parsed.flags["opt33"]).toBe("v33");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file33.txt"]);
  });
  it("case 034: --opt34=v34 with positional file34.txt", () => {
    pbkdf2Sync("case-34", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt34=v34", "file34.txt", "--verbose"]);
    expect(parsed.flags["opt34"]).toBe("v34");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file34.txt"]);
  });
  it("case 035: --opt35=v35 with positional file35.txt", () => {
    pbkdf2Sync("case-35", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt35=v35", "file35.txt", "--verbose"]);
    expect(parsed.flags["opt35"]).toBe("v35");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file35.txt"]);
  });
  it("case 036: --opt36=v36 with positional file36.txt", () => {
    pbkdf2Sync("case-36", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt36=v36", "file36.txt", "--verbose"]);
    expect(parsed.flags["opt36"]).toBe("v36");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file36.txt"]);
  });
  it("case 037: --opt37=v37 with positional file37.txt", () => {
    pbkdf2Sync("case-37", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt37=v37", "file37.txt", "--verbose"]);
    expect(parsed.flags["opt37"]).toBe("v37");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file37.txt"]);
  });
  it("case 038: --opt38=v38 with positional file38.txt", () => {
    pbkdf2Sync("case-38", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt38=v38", "file38.txt", "--verbose"]);
    expect(parsed.flags["opt38"]).toBe("v38");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file38.txt"]);
  });
  it("case 039: --opt39=v39 with positional file39.txt", () => {
    pbkdf2Sync("case-39", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt39=v39", "file39.txt", "--verbose"]);
    expect(parsed.flags["opt39"]).toBe("v39");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file39.txt"]);
  });
  it("case 040: --opt40=v40 with positional file40.txt", () => {
    pbkdf2Sync("case-40", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt40=v40", "file40.txt", "--verbose"]);
    expect(parsed.flags["opt40"]).toBe("v40");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file40.txt"]);
  });
  it("case 041: --opt41=v41 with positional file41.txt", () => {
    pbkdf2Sync("case-41", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt41=v41", "file41.txt", "--verbose"]);
    expect(parsed.flags["opt41"]).toBe("v41");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file41.txt"]);
  });
  it("case 042: --opt42=v42 with positional file42.txt", () => {
    pbkdf2Sync("case-42", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt42=v42", "file42.txt", "--verbose"]);
    expect(parsed.flags["opt42"]).toBe("v42");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file42.txt"]);
  });
  it("case 043: --opt43=v43 with positional file43.txt", () => {
    pbkdf2Sync("case-43", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt43=v43", "file43.txt", "--verbose"]);
    expect(parsed.flags["opt43"]).toBe("v43");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file43.txt"]);
  });
  it("case 044: --opt44=v44 with positional file44.txt", () => {
    pbkdf2Sync("case-44", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt44=v44", "file44.txt", "--verbose"]);
    expect(parsed.flags["opt44"]).toBe("v44");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file44.txt"]);
  });
  it("case 045: --opt45=v45 with positional file45.txt", () => {
    pbkdf2Sync("case-45", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt45=v45", "file45.txt", "--verbose"]);
    expect(parsed.flags["opt45"]).toBe("v45");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file45.txt"]);
  });
  it("case 046: --opt46=v46 with positional file46.txt", () => {
    pbkdf2Sync("case-46", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt46=v46", "file46.txt", "--verbose"]);
    expect(parsed.flags["opt46"]).toBe("v46");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file46.txt"]);
  });
  it("case 047: --opt47=v47 with positional file47.txt", () => {
    pbkdf2Sync("case-47", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt47=v47", "file47.txt", "--verbose"]);
    expect(parsed.flags["opt47"]).toBe("v47");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file47.txt"]);
  });
  it("case 048: --opt48=v48 with positional file48.txt", () => {
    pbkdf2Sync("case-48", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt48=v48", "file48.txt", "--verbose"]);
    expect(parsed.flags["opt48"]).toBe("v48");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file48.txt"]);
  });
  it("case 049: --opt49=v49 with positional file49.txt", () => {
    pbkdf2Sync("case-49", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt49=v49", "file49.txt", "--verbose"]);
    expect(parsed.flags["opt49"]).toBe("v49");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file49.txt"]);
  });
  it("case 050: --opt50=v50 with positional file50.txt", () => {
    pbkdf2Sync("case-50", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt50=v50", "file50.txt", "--verbose"]);
    expect(parsed.flags["opt50"]).toBe("v50");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file50.txt"]);
  });
  it("case 051: --opt51=v51 with positional file51.txt", () => {
    pbkdf2Sync("case-51", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt51=v51", "file51.txt", "--verbose"]);
    expect(parsed.flags["opt51"]).toBe("v51");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file51.txt"]);
  });
  it("case 052: --opt52=v52 with positional file52.txt", () => {
    pbkdf2Sync("case-52", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt52=v52", "file52.txt", "--verbose"]);
    expect(parsed.flags["opt52"]).toBe("v52");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file52.txt"]);
  });
  it("case 053: --opt53=v53 with positional file53.txt", () => {
    pbkdf2Sync("case-53", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt53=v53", "file53.txt", "--verbose"]);
    expect(parsed.flags["opt53"]).toBe("v53");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file53.txt"]);
  });
  it("case 054: --opt54=v54 with positional file54.txt", () => {
    pbkdf2Sync("case-54", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt54=v54", "file54.txt", "--verbose"]);
    expect(parsed.flags["opt54"]).toBe("v54");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file54.txt"]);
  });
  it("case 055: --opt55=v55 with positional file55.txt", () => {
    pbkdf2Sync("case-55", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt55=v55", "file55.txt", "--verbose"]);
    expect(parsed.flags["opt55"]).toBe("v55");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file55.txt"]);
  });
  it("case 056: --opt56=v56 with positional file56.txt", () => {
    pbkdf2Sync("case-56", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt56=v56", "file56.txt", "--verbose"]);
    expect(parsed.flags["opt56"]).toBe("v56");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file56.txt"]);
  });
  it("case 057: --opt57=v57 with positional file57.txt", () => {
    pbkdf2Sync("case-57", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt57=v57", "file57.txt", "--verbose"]);
    expect(parsed.flags["opt57"]).toBe("v57");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file57.txt"]);
  });
  it("case 058: --opt58=v58 with positional file58.txt", () => {
    pbkdf2Sync("case-58", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt58=v58", "file58.txt", "--verbose"]);
    expect(parsed.flags["opt58"]).toBe("v58");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file58.txt"]);
  });
  it("case 059: --opt59=v59 with positional file59.txt", () => {
    pbkdf2Sync("case-59", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt59=v59", "file59.txt", "--verbose"]);
    expect(parsed.flags["opt59"]).toBe("v59");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file59.txt"]);
  });
  it("case 060: --opt60=v60 with positional file60.txt", () => {
    pbkdf2Sync("case-60", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt60=v60", "file60.txt", "--verbose"]);
    expect(parsed.flags["opt60"]).toBe("v60");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file60.txt"]);
  });
  it("case 061: --opt61=v61 with positional file61.txt", () => {
    pbkdf2Sync("case-61", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt61=v61", "file61.txt", "--verbose"]);
    expect(parsed.flags["opt61"]).toBe("v61");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file61.txt"]);
  });
  it("case 062: --opt62=v62 with positional file62.txt", () => {
    pbkdf2Sync("case-62", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt62=v62", "file62.txt", "--verbose"]);
    expect(parsed.flags["opt62"]).toBe("v62");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file62.txt"]);
  });
  it("case 063: --opt63=v63 with positional file63.txt", () => {
    pbkdf2Sync("case-63", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt63=v63", "file63.txt", "--verbose"]);
    expect(parsed.flags["opt63"]).toBe("v63");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file63.txt"]);
  });
  it("case 064: --opt64=v64 with positional file64.txt", () => {
    pbkdf2Sync("case-64", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt64=v64", "file64.txt", "--verbose"]);
    expect(parsed.flags["opt64"]).toBe("v64");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file64.txt"]);
  });
  it("case 065: --opt65=v65 with positional file65.txt", () => {
    pbkdf2Sync("case-65", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt65=v65", "file65.txt", "--verbose"]);
    expect(parsed.flags["opt65"]).toBe("v65");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file65.txt"]);
  });
  it("case 066: --opt66=v66 with positional file66.txt", () => {
    pbkdf2Sync("case-66", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt66=v66", "file66.txt", "--verbose"]);
    expect(parsed.flags["opt66"]).toBe("v66");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file66.txt"]);
  });
  it("case 067: --opt67=v67 with positional file67.txt", () => {
    pbkdf2Sync("case-67", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt67=v67", "file67.txt", "--verbose"]);
    expect(parsed.flags["opt67"]).toBe("v67");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file67.txt"]);
  });
  it("case 068: --opt68=v68 with positional file68.txt", () => {
    pbkdf2Sync("case-68", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt68=v68", "file68.txt", "--verbose"]);
    expect(parsed.flags["opt68"]).toBe("v68");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file68.txt"]);
  });
  it("case 069: --opt69=v69 with positional file69.txt", () => {
    pbkdf2Sync("case-69", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt69=v69", "file69.txt", "--verbose"]);
    expect(parsed.flags["opt69"]).toBe("v69");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file69.txt"]);
  });
  it("case 070: --opt70=v70 with positional file70.txt", () => {
    pbkdf2Sync("case-70", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt70=v70", "file70.txt", "--verbose"]);
    expect(parsed.flags["opt70"]).toBe("v70");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file70.txt"]);
  });
  it("case 071: --opt71=v71 with positional file71.txt", () => {
    pbkdf2Sync("case-71", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt71=v71", "file71.txt", "--verbose"]);
    expect(parsed.flags["opt71"]).toBe("v71");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file71.txt"]);
  });
  it("case 072: --opt72=v72 with positional file72.txt", () => {
    pbkdf2Sync("case-72", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt72=v72", "file72.txt", "--verbose"]);
    expect(parsed.flags["opt72"]).toBe("v72");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file72.txt"]);
  });
  it("case 073: --opt73=v73 with positional file73.txt", () => {
    pbkdf2Sync("case-73", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt73=v73", "file73.txt", "--verbose"]);
    expect(parsed.flags["opt73"]).toBe("v73");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file73.txt"]);
  });
  it("case 074: --opt74=v74 with positional file74.txt", () => {
    pbkdf2Sync("case-74", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt74=v74", "file74.txt", "--verbose"]);
    expect(parsed.flags["opt74"]).toBe("v74");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file74.txt"]);
  });
  it("case 075: --opt75=v75 with positional file75.txt", () => {
    pbkdf2Sync("case-75", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt75=v75", "file75.txt", "--verbose"]);
    expect(parsed.flags["opt75"]).toBe("v75");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file75.txt"]);
  });
  it("case 076: --opt76=v76 with positional file76.txt", () => {
    pbkdf2Sync("case-76", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt76=v76", "file76.txt", "--verbose"]);
    expect(parsed.flags["opt76"]).toBe("v76");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file76.txt"]);
  });
  it("case 077: --opt77=v77 with positional file77.txt", () => {
    pbkdf2Sync("case-77", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt77=v77", "file77.txt", "--verbose"]);
    expect(parsed.flags["opt77"]).toBe("v77");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file77.txt"]);
  });
  it("case 078: --opt78=v78 with positional file78.txt", () => {
    pbkdf2Sync("case-78", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt78=v78", "file78.txt", "--verbose"]);
    expect(parsed.flags["opt78"]).toBe("v78");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file78.txt"]);
  });
  it("case 079: --opt79=v79 with positional file79.txt", () => {
    pbkdf2Sync("case-79", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt79=v79", "file79.txt", "--verbose"]);
    expect(parsed.flags["opt79"]).toBe("v79");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file79.txt"]);
  });
  it("case 080: --opt80=v80 with positional file80.txt", () => {
    pbkdf2Sync("case-80", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt80=v80", "file80.txt", "--verbose"]);
    expect(parsed.flags["opt80"]).toBe("v80");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file80.txt"]);
  });
  it("case 081: --opt81=v81 with positional file81.txt", () => {
    pbkdf2Sync("case-81", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt81=v81", "file81.txt", "--verbose"]);
    expect(parsed.flags["opt81"]).toBe("v81");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file81.txt"]);
  });
  it("case 082: --opt82=v82 with positional file82.txt", () => {
    pbkdf2Sync("case-82", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt82=v82", "file82.txt", "--verbose"]);
    expect(parsed.flags["opt82"]).toBe("v82");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file82.txt"]);
  });
  it("case 083: --opt83=v83 with positional file83.txt", () => {
    pbkdf2Sync("case-83", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt83=v83", "file83.txt", "--verbose"]);
    expect(parsed.flags["opt83"]).toBe("v83");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file83.txt"]);
  });
  it("case 084: --opt84=v84 with positional file84.txt", () => {
    pbkdf2Sync("case-84", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt84=v84", "file84.txt", "--verbose"]);
    expect(parsed.flags["opt84"]).toBe("v84");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file84.txt"]);
  });
  it("case 085: --opt85=v85 with positional file85.txt", () => {
    pbkdf2Sync("case-85", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt85=v85", "file85.txt", "--verbose"]);
    expect(parsed.flags["opt85"]).toBe("v85");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file85.txt"]);
  });
  it("case 086: --opt86=v86 with positional file86.txt", () => {
    pbkdf2Sync("case-86", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt86=v86", "file86.txt", "--verbose"]);
    expect(parsed.flags["opt86"]).toBe("v86");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file86.txt"]);
  });
  it("case 087: --opt87=v87 with positional file87.txt", () => {
    pbkdf2Sync("case-87", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt87=v87", "file87.txt", "--verbose"]);
    expect(parsed.flags["opt87"]).toBe("v87");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file87.txt"]);
  });
  it("case 088: --opt88=v88 with positional file88.txt", () => {
    pbkdf2Sync("case-88", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt88=v88", "file88.txt", "--verbose"]);
    expect(parsed.flags["opt88"]).toBe("v88");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file88.txt"]);
  });
  it("case 089: --opt89=v89 with positional file89.txt", () => {
    pbkdf2Sync("case-89", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt89=v89", "file89.txt", "--verbose"]);
    expect(parsed.flags["opt89"]).toBe("v89");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file89.txt"]);
  });
  it("case 090: --opt90=v90 with positional file90.txt", () => {
    pbkdf2Sync("case-90", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt90=v90", "file90.txt", "--verbose"]);
    expect(parsed.flags["opt90"]).toBe("v90");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file90.txt"]);
  });
  it("case 091: --opt91=v91 with positional file91.txt", () => {
    pbkdf2Sync("case-91", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt91=v91", "file91.txt", "--verbose"]);
    expect(parsed.flags["opt91"]).toBe("v91");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file91.txt"]);
  });
  it("case 092: --opt92=v92 with positional file92.txt", () => {
    pbkdf2Sync("case-92", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt92=v92", "file92.txt", "--verbose"]);
    expect(parsed.flags["opt92"]).toBe("v92");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file92.txt"]);
  });
  it("case 093: --opt93=v93 with positional file93.txt", () => {
    pbkdf2Sync("case-93", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt93=v93", "file93.txt", "--verbose"]);
    expect(parsed.flags["opt93"]).toBe("v93");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file93.txt"]);
  });
  it("case 094: --opt94=v94 with positional file94.txt", () => {
    pbkdf2Sync("case-94", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt94=v94", "file94.txt", "--verbose"]);
    expect(parsed.flags["opt94"]).toBe("v94");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file94.txt"]);
  });
  it("case 095: --opt95=v95 with positional file95.txt", () => {
    pbkdf2Sync("case-95", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt95=v95", "file95.txt", "--verbose"]);
    expect(parsed.flags["opt95"]).toBe("v95");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file95.txt"]);
  });
  it("case 096: --opt96=v96 with positional file96.txt", () => {
    pbkdf2Sync("case-96", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt96=v96", "file96.txt", "--verbose"]);
    expect(parsed.flags["opt96"]).toBe("v96");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file96.txt"]);
  });
  it("case 097: --opt97=v97 with positional file97.txt", () => {
    pbkdf2Sync("case-97", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt97=v97", "file97.txt", "--verbose"]);
    expect(parsed.flags["opt97"]).toBe("v97");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file97.txt"]);
  });
  it("case 098: --opt98=v98 with positional file98.txt", () => {
    pbkdf2Sync("case-98", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt98=v98", "file98.txt", "--verbose"]);
    expect(parsed.flags["opt98"]).toBe("v98");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file98.txt"]);
  });
  it("case 099: --opt99=v99 with positional file99.txt", () => {
    pbkdf2Sync("case-99", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt99=v99", "file99.txt", "--verbose"]);
    expect(parsed.flags["opt99"]).toBe("v99");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file99.txt"]);
  });
  it("case 100: --opt100=v100 with positional file100.txt", () => {
    pbkdf2Sync("case-100", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt100=v100", "file100.txt", "--verbose"]);
    expect(parsed.flags["opt100"]).toBe("v100");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file100.txt"]);
  });
  it("case 101: --opt101=v101 with positional file101.txt", () => {
    pbkdf2Sync("case-101", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt101=v101", "file101.txt", "--verbose"]);
    expect(parsed.flags["opt101"]).toBe("v101");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file101.txt"]);
  });
  it("case 102: --opt102=v102 with positional file102.txt", () => {
    pbkdf2Sync("case-102", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt102=v102", "file102.txt", "--verbose"]);
    expect(parsed.flags["opt102"]).toBe("v102");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file102.txt"]);
  });
  it("case 103: --opt103=v103 with positional file103.txt", () => {
    pbkdf2Sync("case-103", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt103=v103", "file103.txt", "--verbose"]);
    expect(parsed.flags["opt103"]).toBe("v103");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file103.txt"]);
  });
  it("case 104: --opt104=v104 with positional file104.txt", () => {
    pbkdf2Sync("case-104", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt104=v104", "file104.txt", "--verbose"]);
    expect(parsed.flags["opt104"]).toBe("v104");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file104.txt"]);
  });
  it("case 105: --opt105=v105 with positional file105.txt", () => {
    pbkdf2Sync("case-105", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt105=v105", "file105.txt", "--verbose"]);
    expect(parsed.flags["opt105"]).toBe("v105");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file105.txt"]);
  });
  it("case 106: --opt106=v106 with positional file106.txt", () => {
    pbkdf2Sync("case-106", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt106=v106", "file106.txt", "--verbose"]);
    expect(parsed.flags["opt106"]).toBe("v106");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file106.txt"]);
  });
  it("case 107: --opt107=v107 with positional file107.txt", () => {
    pbkdf2Sync("case-107", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt107=v107", "file107.txt", "--verbose"]);
    expect(parsed.flags["opt107"]).toBe("v107");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file107.txt"]);
  });
  it("case 108: --opt108=v108 with positional file108.txt", () => {
    pbkdf2Sync("case-108", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt108=v108", "file108.txt", "--verbose"]);
    expect(parsed.flags["opt108"]).toBe("v108");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file108.txt"]);
  });
  it("case 109: --opt109=v109 with positional file109.txt", () => {
    pbkdf2Sync("case-109", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt109=v109", "file109.txt", "--verbose"]);
    expect(parsed.flags["opt109"]).toBe("v109");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file109.txt"]);
  });
  it("case 110: --opt110=v110 with positional file110.txt", () => {
    pbkdf2Sync("case-110", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt110=v110", "file110.txt", "--verbose"]);
    expect(parsed.flags["opt110"]).toBe("v110");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file110.txt"]);
  });
  it("case 111: --opt111=v111 with positional file111.txt", () => {
    pbkdf2Sync("case-111", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt111=v111", "file111.txt", "--verbose"]);
    expect(parsed.flags["opt111"]).toBe("v111");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file111.txt"]);
  });
  it("case 112: --opt112=v112 with positional file112.txt", () => {
    pbkdf2Sync("case-112", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt112=v112", "file112.txt", "--verbose"]);
    expect(parsed.flags["opt112"]).toBe("v112");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file112.txt"]);
  });
  it("case 113: --opt113=v113 with positional file113.txt", () => {
    pbkdf2Sync("case-113", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt113=v113", "file113.txt", "--verbose"]);
    expect(parsed.flags["opt113"]).toBe("v113");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file113.txt"]);
  });
  it("case 114: --opt114=v114 with positional file114.txt", () => {
    pbkdf2Sync("case-114", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt114=v114", "file114.txt", "--verbose"]);
    expect(parsed.flags["opt114"]).toBe("v114");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file114.txt"]);
  });
  it("case 115: --opt115=v115 with positional file115.txt", () => {
    pbkdf2Sync("case-115", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt115=v115", "file115.txt", "--verbose"]);
    expect(parsed.flags["opt115"]).toBe("v115");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file115.txt"]);
  });
  it("case 116: --opt116=v116 with positional file116.txt", () => {
    pbkdf2Sync("case-116", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt116=v116", "file116.txt", "--verbose"]);
    expect(parsed.flags["opt116"]).toBe("v116");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file116.txt"]);
  });
  it("case 117: --opt117=v117 with positional file117.txt", () => {
    pbkdf2Sync("case-117", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt117=v117", "file117.txt", "--verbose"]);
    expect(parsed.flags["opt117"]).toBe("v117");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file117.txt"]);
  });
  it("case 118: --opt118=v118 with positional file118.txt", () => {
    pbkdf2Sync("case-118", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt118=v118", "file118.txt", "--verbose"]);
    expect(parsed.flags["opt118"]).toBe("v118");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file118.txt"]);
  });
  it("case 119: --opt119=v119 with positional file119.txt", () => {
    pbkdf2Sync("case-119", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt119=v119", "file119.txt", "--verbose"]);
    expect(parsed.flags["opt119"]).toBe("v119");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file119.txt"]);
  });
  it("case 120: --opt120=v120 with positional file120.txt", () => {
    pbkdf2Sync("case-120", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt120=v120", "file120.txt", "--verbose"]);
    expect(parsed.flags["opt120"]).toBe("v120");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file120.txt"]);
  });
  it("case 121: --opt121=v121 with positional file121.txt", () => {
    pbkdf2Sync("case-121", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt121=v121", "file121.txt", "--verbose"]);
    expect(parsed.flags["opt121"]).toBe("v121");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file121.txt"]);
  });
  it("case 122: --opt122=v122 with positional file122.txt", () => {
    pbkdf2Sync("case-122", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt122=v122", "file122.txt", "--verbose"]);
    expect(parsed.flags["opt122"]).toBe("v122");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file122.txt"]);
  });
  it("case 123: --opt123=v123 with positional file123.txt", () => {
    pbkdf2Sync("case-123", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt123=v123", "file123.txt", "--verbose"]);
    expect(parsed.flags["opt123"]).toBe("v123");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file123.txt"]);
  });
  it("case 124: --opt124=v124 with positional file124.txt", () => {
    pbkdf2Sync("case-124", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt124=v124", "file124.txt", "--verbose"]);
    expect(parsed.flags["opt124"]).toBe("v124");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file124.txt"]);
  });
  it("case 125: --opt125=v125 with positional file125.txt", () => {
    pbkdf2Sync("case-125", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt125=v125", "file125.txt", "--verbose"]);
    expect(parsed.flags["opt125"]).toBe("v125");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file125.txt"]);
  });
  it("case 126: --opt126=v126 with positional file126.txt", () => {
    pbkdf2Sync("case-126", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt126=v126", "file126.txt", "--verbose"]);
    expect(parsed.flags["opt126"]).toBe("v126");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file126.txt"]);
  });
  it("case 127: --opt127=v127 with positional file127.txt", () => {
    pbkdf2Sync("case-127", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt127=v127", "file127.txt", "--verbose"]);
    expect(parsed.flags["opt127"]).toBe("v127");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file127.txt"]);
  });
  it("case 128: --opt128=v128 with positional file128.txt", () => {
    pbkdf2Sync("case-128", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt128=v128", "file128.txt", "--verbose"]);
    expect(parsed.flags["opt128"]).toBe("v128");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file128.txt"]);
  });
  it("case 129: --opt129=v129 with positional file129.txt", () => {
    pbkdf2Sync("case-129", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt129=v129", "file129.txt", "--verbose"]);
    expect(parsed.flags["opt129"]).toBe("v129");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file129.txt"]);
  });
  it("case 130: --opt130=v130 with positional file130.txt", () => {
    pbkdf2Sync("case-130", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt130=v130", "file130.txt", "--verbose"]);
    expect(parsed.flags["opt130"]).toBe("v130");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file130.txt"]);
  });
  it("case 131: --opt131=v131 with positional file131.txt", () => {
    pbkdf2Sync("case-131", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt131=v131", "file131.txt", "--verbose"]);
    expect(parsed.flags["opt131"]).toBe("v131");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file131.txt"]);
  });
  it("case 132: --opt132=v132 with positional file132.txt", () => {
    pbkdf2Sync("case-132", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt132=v132", "file132.txt", "--verbose"]);
    expect(parsed.flags["opt132"]).toBe("v132");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file132.txt"]);
  });
  it("case 133: --opt133=v133 with positional file133.txt", () => {
    pbkdf2Sync("case-133", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt133=v133", "file133.txt", "--verbose"]);
    expect(parsed.flags["opt133"]).toBe("v133");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file133.txt"]);
  });
  it("case 134: --opt134=v134 with positional file134.txt", () => {
    pbkdf2Sync("case-134", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt134=v134", "file134.txt", "--verbose"]);
    expect(parsed.flags["opt134"]).toBe("v134");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file134.txt"]);
  });
  it("case 135: --opt135=v135 with positional file135.txt", () => {
    pbkdf2Sync("case-135", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt135=v135", "file135.txt", "--verbose"]);
    expect(parsed.flags["opt135"]).toBe("v135");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file135.txt"]);
  });
  it("case 136: --opt136=v136 with positional file136.txt", () => {
    pbkdf2Sync("case-136", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt136=v136", "file136.txt", "--verbose"]);
    expect(parsed.flags["opt136"]).toBe("v136");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file136.txt"]);
  });
  it("case 137: --opt137=v137 with positional file137.txt", () => {
    pbkdf2Sync("case-137", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt137=v137", "file137.txt", "--verbose"]);
    expect(parsed.flags["opt137"]).toBe("v137");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file137.txt"]);
  });
  it("case 138: --opt138=v138 with positional file138.txt", () => {
    pbkdf2Sync("case-138", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt138=v138", "file138.txt", "--verbose"]);
    expect(parsed.flags["opt138"]).toBe("v138");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file138.txt"]);
  });
  it("case 139: --opt139=v139 with positional file139.txt", () => {
    pbkdf2Sync("case-139", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt139=v139", "file139.txt", "--verbose"]);
    expect(parsed.flags["opt139"]).toBe("v139");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file139.txt"]);
  });
  it("case 140: --opt140=v140 with positional file140.txt", () => {
    pbkdf2Sync("case-140", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt140=v140", "file140.txt", "--verbose"]);
    expect(parsed.flags["opt140"]).toBe("v140");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file140.txt"]);
  });
  it("case 141: --opt141=v141 with positional file141.txt", () => {
    pbkdf2Sync("case-141", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt141=v141", "file141.txt", "--verbose"]);
    expect(parsed.flags["opt141"]).toBe("v141");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file141.txt"]);
  });
  it("case 142: --opt142=v142 with positional file142.txt", () => {
    pbkdf2Sync("case-142", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt142=v142", "file142.txt", "--verbose"]);
    expect(parsed.flags["opt142"]).toBe("v142");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file142.txt"]);
  });
  it("case 143: --opt143=v143 with positional file143.txt", () => {
    pbkdf2Sync("case-143", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt143=v143", "file143.txt", "--verbose"]);
    expect(parsed.flags["opt143"]).toBe("v143");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file143.txt"]);
  });
  it("case 144: --opt144=v144 with positional file144.txt", () => {
    pbkdf2Sync("case-144", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt144=v144", "file144.txt", "--verbose"]);
    expect(parsed.flags["opt144"]).toBe("v144");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file144.txt"]);
  });
  it("case 145: --opt145=v145 with positional file145.txt", () => {
    pbkdf2Sync("case-145", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt145=v145", "file145.txt", "--verbose"]);
    expect(parsed.flags["opt145"]).toBe("v145");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file145.txt"]);
  });
  it("case 146: --opt146=v146 with positional file146.txt", () => {
    pbkdf2Sync("case-146", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt146=v146", "file146.txt", "--verbose"]);
    expect(parsed.flags["opt146"]).toBe("v146");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file146.txt"]);
  });
  it("case 147: --opt147=v147 with positional file147.txt", () => {
    pbkdf2Sync("case-147", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt147=v147", "file147.txt", "--verbose"]);
    expect(parsed.flags["opt147"]).toBe("v147");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file147.txt"]);
  });
  it("case 148: --opt148=v148 with positional file148.txt", () => {
    pbkdf2Sync("case-148", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt148=v148", "file148.txt", "--verbose"]);
    expect(parsed.flags["opt148"]).toBe("v148");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file148.txt"]);
  });
  it("case 149: --opt149=v149 with positional file149.txt", () => {
    pbkdf2Sync("case-149", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt149=v149", "file149.txt", "--verbose"]);
    expect(parsed.flags["opt149"]).toBe("v149");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file149.txt"]);
  });
  it("case 150: --opt150=v150 with positional file150.txt", () => {
    pbkdf2Sync("case-150", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt150=v150", "file150.txt", "--verbose"]);
    expect(parsed.flags["opt150"]).toBe("v150");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file150.txt"]);
  });
  it("case 151: --opt151=v151 with positional file151.txt", () => {
    pbkdf2Sync("case-151", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt151=v151", "file151.txt", "--verbose"]);
    expect(parsed.flags["opt151"]).toBe("v151");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file151.txt"]);
  });
  it("case 152: --opt152=v152 with positional file152.txt", () => {
    pbkdf2Sync("case-152", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt152=v152", "file152.txt", "--verbose"]);
    expect(parsed.flags["opt152"]).toBe("v152");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file152.txt"]);
  });
  it("case 153: --opt153=v153 with positional file153.txt", () => {
    pbkdf2Sync("case-153", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt153=v153", "file153.txt", "--verbose"]);
    expect(parsed.flags["opt153"]).toBe("v153");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file153.txt"]);
  });
  it("case 154: --opt154=v154 with positional file154.txt", () => {
    pbkdf2Sync("case-154", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt154=v154", "file154.txt", "--verbose"]);
    expect(parsed.flags["opt154"]).toBe("v154");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file154.txt"]);
  });
  it("case 155: --opt155=v155 with positional file155.txt", () => {
    pbkdf2Sync("case-155", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt155=v155", "file155.txt", "--verbose"]);
    expect(parsed.flags["opt155"]).toBe("v155");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file155.txt"]);
  });
  it("case 156: --opt156=v156 with positional file156.txt", () => {
    pbkdf2Sync("case-156", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt156=v156", "file156.txt", "--verbose"]);
    expect(parsed.flags["opt156"]).toBe("v156");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file156.txt"]);
  });
  it("case 157: --opt157=v157 with positional file157.txt", () => {
    pbkdf2Sync("case-157", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt157=v157", "file157.txt", "--verbose"]);
    expect(parsed.flags["opt157"]).toBe("v157");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file157.txt"]);
  });
  it("case 158: --opt158=v158 with positional file158.txt", () => {
    pbkdf2Sync("case-158", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt158=v158", "file158.txt", "--verbose"]);
    expect(parsed.flags["opt158"]).toBe("v158");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file158.txt"]);
  });
  it("case 159: --opt159=v159 with positional file159.txt", () => {
    pbkdf2Sync("case-159", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt159=v159", "file159.txt", "--verbose"]);
    expect(parsed.flags["opt159"]).toBe("v159");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file159.txt"]);
  });
  it("case 160: --opt160=v160 with positional file160.txt", () => {
    pbkdf2Sync("case-160", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt160=v160", "file160.txt", "--verbose"]);
    expect(parsed.flags["opt160"]).toBe("v160");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file160.txt"]);
  });
  it("case 161: --opt161=v161 with positional file161.txt", () => {
    pbkdf2Sync("case-161", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt161=v161", "file161.txt", "--verbose"]);
    expect(parsed.flags["opt161"]).toBe("v161");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file161.txt"]);
  });
  it("case 162: --opt162=v162 with positional file162.txt", () => {
    pbkdf2Sync("case-162", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt162=v162", "file162.txt", "--verbose"]);
    expect(parsed.flags["opt162"]).toBe("v162");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file162.txt"]);
  });
  it("case 163: --opt163=v163 with positional file163.txt", () => {
    pbkdf2Sync("case-163", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt163=v163", "file163.txt", "--verbose"]);
    expect(parsed.flags["opt163"]).toBe("v163");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file163.txt"]);
  });
  it("case 164: --opt164=v164 with positional file164.txt", () => {
    pbkdf2Sync("case-164", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt164=v164", "file164.txt", "--verbose"]);
    expect(parsed.flags["opt164"]).toBe("v164");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file164.txt"]);
  });
  it("case 165: --opt165=v165 with positional file165.txt", () => {
    pbkdf2Sync("case-165", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt165=v165", "file165.txt", "--verbose"]);
    expect(parsed.flags["opt165"]).toBe("v165");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file165.txt"]);
  });
  it("case 166: --opt166=v166 with positional file166.txt", () => {
    pbkdf2Sync("case-166", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt166=v166", "file166.txt", "--verbose"]);
    expect(parsed.flags["opt166"]).toBe("v166");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file166.txt"]);
  });
  it("case 167: --opt167=v167 with positional file167.txt", () => {
    pbkdf2Sync("case-167", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt167=v167", "file167.txt", "--verbose"]);
    expect(parsed.flags["opt167"]).toBe("v167");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file167.txt"]);
  });
  it("case 168: --opt168=v168 with positional file168.txt", () => {
    pbkdf2Sync("case-168", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt168=v168", "file168.txt", "--verbose"]);
    expect(parsed.flags["opt168"]).toBe("v168");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file168.txt"]);
  });
  it("case 169: --opt169=v169 with positional file169.txt", () => {
    pbkdf2Sync("case-169", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt169=v169", "file169.txt", "--verbose"]);
    expect(parsed.flags["opt169"]).toBe("v169");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file169.txt"]);
  });
  it("case 170: --opt170=v170 with positional file170.txt", () => {
    pbkdf2Sync("case-170", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt170=v170", "file170.txt", "--verbose"]);
    expect(parsed.flags["opt170"]).toBe("v170");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file170.txt"]);
  });
  it("case 171: --opt171=v171 with positional file171.txt", () => {
    pbkdf2Sync("case-171", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt171=v171", "file171.txt", "--verbose"]);
    expect(parsed.flags["opt171"]).toBe("v171");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file171.txt"]);
  });
  it("case 172: --opt172=v172 with positional file172.txt", () => {
    pbkdf2Sync("case-172", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt172=v172", "file172.txt", "--verbose"]);
    expect(parsed.flags["opt172"]).toBe("v172");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file172.txt"]);
  });
  it("case 173: --opt173=v173 with positional file173.txt", () => {
    pbkdf2Sync("case-173", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt173=v173", "file173.txt", "--verbose"]);
    expect(parsed.flags["opt173"]).toBe("v173");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file173.txt"]);
  });
  it("case 174: --opt174=v174 with positional file174.txt", () => {
    pbkdf2Sync("case-174", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt174=v174", "file174.txt", "--verbose"]);
    expect(parsed.flags["opt174"]).toBe("v174");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file174.txt"]);
  });
  it("case 175: --opt175=v175 with positional file175.txt", () => {
    pbkdf2Sync("case-175", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt175=v175", "file175.txt", "--verbose"]);
    expect(parsed.flags["opt175"]).toBe("v175");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file175.txt"]);
  });
  it("case 176: --opt176=v176 with positional file176.txt", () => {
    pbkdf2Sync("case-176", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt176=v176", "file176.txt", "--verbose"]);
    expect(parsed.flags["opt176"]).toBe("v176");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file176.txt"]);
  });
  it("case 177: --opt177=v177 with positional file177.txt", () => {
    pbkdf2Sync("case-177", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt177=v177", "file177.txt", "--verbose"]);
    expect(parsed.flags["opt177"]).toBe("v177");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file177.txt"]);
  });
  it("case 178: --opt178=v178 with positional file178.txt", () => {
    pbkdf2Sync("case-178", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt178=v178", "file178.txt", "--verbose"]);
    expect(parsed.flags["opt178"]).toBe("v178");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file178.txt"]);
  });
  it("case 179: --opt179=v179 with positional file179.txt", () => {
    pbkdf2Sync("case-179", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt179=v179", "file179.txt", "--verbose"]);
    expect(parsed.flags["opt179"]).toBe("v179");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file179.txt"]);
  });
  it("case 180: --opt180=v180 with positional file180.txt", () => {
    pbkdf2Sync("case-180", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt180=v180", "file180.txt", "--verbose"]);
    expect(parsed.flags["opt180"]).toBe("v180");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file180.txt"]);
  });
  it("case 181: --opt181=v181 with positional file181.txt", () => {
    pbkdf2Sync("case-181", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt181=v181", "file181.txt", "--verbose"]);
    expect(parsed.flags["opt181"]).toBe("v181");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file181.txt"]);
  });
  it("case 182: --opt182=v182 with positional file182.txt", () => {
    pbkdf2Sync("case-182", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt182=v182", "file182.txt", "--verbose"]);
    expect(parsed.flags["opt182"]).toBe("v182");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file182.txt"]);
  });
  it("case 183: --opt183=v183 with positional file183.txt", () => {
    pbkdf2Sync("case-183", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt183=v183", "file183.txt", "--verbose"]);
    expect(parsed.flags["opt183"]).toBe("v183");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file183.txt"]);
  });
  it("case 184: --opt184=v184 with positional file184.txt", () => {
    pbkdf2Sync("case-184", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt184=v184", "file184.txt", "--verbose"]);
    expect(parsed.flags["opt184"]).toBe("v184");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file184.txt"]);
  });
  it("case 185: --opt185=v185 with positional file185.txt", () => {
    pbkdf2Sync("case-185", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt185=v185", "file185.txt", "--verbose"]);
    expect(parsed.flags["opt185"]).toBe("v185");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file185.txt"]);
  });
  it("case 186: --opt186=v186 with positional file186.txt", () => {
    pbkdf2Sync("case-186", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt186=v186", "file186.txt", "--verbose"]);
    expect(parsed.flags["opt186"]).toBe("v186");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file186.txt"]);
  });
  it("case 187: --opt187=v187 with positional file187.txt", () => {
    pbkdf2Sync("case-187", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt187=v187", "file187.txt", "--verbose"]);
    expect(parsed.flags["opt187"]).toBe("v187");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file187.txt"]);
  });
  it("case 188: --opt188=v188 with positional file188.txt", () => {
    pbkdf2Sync("case-188", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt188=v188", "file188.txt", "--verbose"]);
    expect(parsed.flags["opt188"]).toBe("v188");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file188.txt"]);
  });
  it("case 189: --opt189=v189 with positional file189.txt", () => {
    pbkdf2Sync("case-189", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt189=v189", "file189.txt", "--verbose"]);
    expect(parsed.flags["opt189"]).toBe("v189");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file189.txt"]);
  });
  it("case 190: --opt190=v190 with positional file190.txt", () => {
    pbkdf2Sync("case-190", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt190=v190", "file190.txt", "--verbose"]);
    expect(parsed.flags["opt190"]).toBe("v190");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file190.txt"]);
  });
  it("case 191: --opt191=v191 with positional file191.txt", () => {
    pbkdf2Sync("case-191", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt191=v191", "file191.txt", "--verbose"]);
    expect(parsed.flags["opt191"]).toBe("v191");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file191.txt"]);
  });
  it("case 192: --opt192=v192 with positional file192.txt", () => {
    pbkdf2Sync("case-192", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt192=v192", "file192.txt", "--verbose"]);
    expect(parsed.flags["opt192"]).toBe("v192");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file192.txt"]);
  });
  it("case 193: --opt193=v193 with positional file193.txt", () => {
    pbkdf2Sync("case-193", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt193=v193", "file193.txt", "--verbose"]);
    expect(parsed.flags["opt193"]).toBe("v193");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file193.txt"]);
  });
  it("case 194: --opt194=v194 with positional file194.txt", () => {
    pbkdf2Sync("case-194", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt194=v194", "file194.txt", "--verbose"]);
    expect(parsed.flags["opt194"]).toBe("v194");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file194.txt"]);
  });
  it("case 195: --opt195=v195 with positional file195.txt", () => {
    pbkdf2Sync("case-195", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt195=v195", "file195.txt", "--verbose"]);
    expect(parsed.flags["opt195"]).toBe("v195");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file195.txt"]);
  });
  it("case 196: --opt196=v196 with positional file196.txt", () => {
    pbkdf2Sync("case-196", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt196=v196", "file196.txt", "--verbose"]);
    expect(parsed.flags["opt196"]).toBe("v196");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file196.txt"]);
  });
  it("case 197: --opt197=v197 with positional file197.txt", () => {
    pbkdf2Sync("case-197", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt197=v197", "file197.txt", "--verbose"]);
    expect(parsed.flags["opt197"]).toBe("v197");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file197.txt"]);
  });
  it("case 198: --opt198=v198 with positional file198.txt", () => {
    pbkdf2Sync("case-198", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt198=v198", "file198.txt", "--verbose"]);
    expect(parsed.flags["opt198"]).toBe("v198");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file198.txt"]);
  });
  it("case 199: --opt199=v199 with positional file199.txt", () => {
    pbkdf2Sync("case-199", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt199=v199", "file199.txt", "--verbose"]);
    expect(parsed.flags["opt199"]).toBe("v199");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file199.txt"]);
  });
  it("case 200: --opt200=v200 with positional file200.txt", () => {
    pbkdf2Sync("case-200", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt200=v200", "file200.txt", "--verbose"]);
    expect(parsed.flags["opt200"]).toBe("v200");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file200.txt"]);
  });
  it("case 201: --opt201=v201 with positional file201.txt", () => {
    pbkdf2Sync("case-201", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt201=v201", "file201.txt", "--verbose"]);
    expect(parsed.flags["opt201"]).toBe("v201");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file201.txt"]);
  });
  it("case 202: --opt202=v202 with positional file202.txt", () => {
    pbkdf2Sync("case-202", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt202=v202", "file202.txt", "--verbose"]);
    expect(parsed.flags["opt202"]).toBe("v202");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file202.txt"]);
  });
  it("case 203: --opt203=v203 with positional file203.txt", () => {
    pbkdf2Sync("case-203", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt203=v203", "file203.txt", "--verbose"]);
    expect(parsed.flags["opt203"]).toBe("v203");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file203.txt"]);
  });
  it("case 204: --opt204=v204 with positional file204.txt", () => {
    pbkdf2Sync("case-204", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt204=v204", "file204.txt", "--verbose"]);
    expect(parsed.flags["opt204"]).toBe("v204");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file204.txt"]);
  });
  it("case 205: --opt205=v205 with positional file205.txt", () => {
    pbkdf2Sync("case-205", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt205=v205", "file205.txt", "--verbose"]);
    expect(parsed.flags["opt205"]).toBe("v205");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file205.txt"]);
  });
  it("case 206: --opt206=v206 with positional file206.txt", () => {
    pbkdf2Sync("case-206", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt206=v206", "file206.txt", "--verbose"]);
    expect(parsed.flags["opt206"]).toBe("v206");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file206.txt"]);
  });
  it("case 207: --opt207=v207 with positional file207.txt", () => {
    pbkdf2Sync("case-207", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt207=v207", "file207.txt", "--verbose"]);
    expect(parsed.flags["opt207"]).toBe("v207");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file207.txt"]);
  });
  it("case 208: --opt208=v208 with positional file208.txt", () => {
    pbkdf2Sync("case-208", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt208=v208", "file208.txt", "--verbose"]);
    expect(parsed.flags["opt208"]).toBe("v208");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file208.txt"]);
  });
  it("case 209: --opt209=v209 with positional file209.txt", () => {
    pbkdf2Sync("case-209", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt209=v209", "file209.txt", "--verbose"]);
    expect(parsed.flags["opt209"]).toBe("v209");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file209.txt"]);
  });
  it("case 210: --opt210=v210 with positional file210.txt", () => {
    pbkdf2Sync("case-210", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt210=v210", "file210.txt", "--verbose"]);
    expect(parsed.flags["opt210"]).toBe("v210");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file210.txt"]);
  });
  it("case 211: --opt211=v211 with positional file211.txt", () => {
    pbkdf2Sync("case-211", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt211=v211", "file211.txt", "--verbose"]);
    expect(parsed.flags["opt211"]).toBe("v211");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file211.txt"]);
  });
  it("case 212: --opt212=v212 with positional file212.txt", () => {
    pbkdf2Sync("case-212", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt212=v212", "file212.txt", "--verbose"]);
    expect(parsed.flags["opt212"]).toBe("v212");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file212.txt"]);
  });
  it("case 213: --opt213=v213 with positional file213.txt", () => {
    pbkdf2Sync("case-213", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt213=v213", "file213.txt", "--verbose"]);
    expect(parsed.flags["opt213"]).toBe("v213");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file213.txt"]);
  });
  it("case 214: --opt214=v214 with positional file214.txt", () => {
    pbkdf2Sync("case-214", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt214=v214", "file214.txt", "--verbose"]);
    expect(parsed.flags["opt214"]).toBe("v214");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file214.txt"]);
  });
  it("case 215: --opt215=v215 with positional file215.txt", () => {
    pbkdf2Sync("case-215", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt215=v215", "file215.txt", "--verbose"]);
    expect(parsed.flags["opt215"]).toBe("v215");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file215.txt"]);
  });
  it("case 216: --opt216=v216 with positional file216.txt", () => {
    pbkdf2Sync("case-216", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt216=v216", "file216.txt", "--verbose"]);
    expect(parsed.flags["opt216"]).toBe("v216");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file216.txt"]);
  });
  it("case 217: --opt217=v217 with positional file217.txt", () => {
    pbkdf2Sync("case-217", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt217=v217", "file217.txt", "--verbose"]);
    expect(parsed.flags["opt217"]).toBe("v217");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file217.txt"]);
  });
  it("case 218: --opt218=v218 with positional file218.txt", () => {
    pbkdf2Sync("case-218", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt218=v218", "file218.txt", "--verbose"]);
    expect(parsed.flags["opt218"]).toBe("v218");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file218.txt"]);
  });
  it("case 219: --opt219=v219 with positional file219.txt", () => {
    pbkdf2Sync("case-219", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt219=v219", "file219.txt", "--verbose"]);
    expect(parsed.flags["opt219"]).toBe("v219");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file219.txt"]);
  });
  it("case 220: --opt220=v220 with positional file220.txt", () => {
    pbkdf2Sync("case-220", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt220=v220", "file220.txt", "--verbose"]);
    expect(parsed.flags["opt220"]).toBe("v220");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file220.txt"]);
  });
  it("case 221: --opt221=v221 with positional file221.txt", () => {
    pbkdf2Sync("case-221", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt221=v221", "file221.txt", "--verbose"]);
    expect(parsed.flags["opt221"]).toBe("v221");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file221.txt"]);
  });
  it("case 222: --opt222=v222 with positional file222.txt", () => {
    pbkdf2Sync("case-222", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt222=v222", "file222.txt", "--verbose"]);
    expect(parsed.flags["opt222"]).toBe("v222");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file222.txt"]);
  });
  it("case 223: --opt223=v223 with positional file223.txt", () => {
    pbkdf2Sync("case-223", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt223=v223", "file223.txt", "--verbose"]);
    expect(parsed.flags["opt223"]).toBe("v223");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file223.txt"]);
  });
  it("case 224: --opt224=v224 with positional file224.txt", () => {
    pbkdf2Sync("case-224", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt224=v224", "file224.txt", "--verbose"]);
    expect(parsed.flags["opt224"]).toBe("v224");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file224.txt"]);
  });
  it("case 225: --opt225=v225 with positional file225.txt", () => {
    pbkdf2Sync("case-225", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt225=v225", "file225.txt", "--verbose"]);
    expect(parsed.flags["opt225"]).toBe("v225");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file225.txt"]);
  });
  it("case 226: --opt226=v226 with positional file226.txt", () => {
    pbkdf2Sync("case-226", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt226=v226", "file226.txt", "--verbose"]);
    expect(parsed.flags["opt226"]).toBe("v226");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file226.txt"]);
  });
  it("case 227: --opt227=v227 with positional file227.txt", () => {
    pbkdf2Sync("case-227", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt227=v227", "file227.txt", "--verbose"]);
    expect(parsed.flags["opt227"]).toBe("v227");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file227.txt"]);
  });
  it("case 228: --opt228=v228 with positional file228.txt", () => {
    pbkdf2Sync("case-228", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt228=v228", "file228.txt", "--verbose"]);
    expect(parsed.flags["opt228"]).toBe("v228");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file228.txt"]);
  });
  it("case 229: --opt229=v229 with positional file229.txt", () => {
    pbkdf2Sync("case-229", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt229=v229", "file229.txt", "--verbose"]);
    expect(parsed.flags["opt229"]).toBe("v229");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file229.txt"]);
  });
  it("case 230: --opt230=v230 with positional file230.txt", () => {
    pbkdf2Sync("case-230", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt230=v230", "file230.txt", "--verbose"]);
    expect(parsed.flags["opt230"]).toBe("v230");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file230.txt"]);
  });
  it("case 231: --opt231=v231 with positional file231.txt", () => {
    pbkdf2Sync("case-231", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt231=v231", "file231.txt", "--verbose"]);
    expect(parsed.flags["opt231"]).toBe("v231");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file231.txt"]);
  });
  it("case 232: --opt232=v232 with positional file232.txt", () => {
    pbkdf2Sync("case-232", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt232=v232", "file232.txt", "--verbose"]);
    expect(parsed.flags["opt232"]).toBe("v232");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file232.txt"]);
  });
  it("case 233: --opt233=v233 with positional file233.txt", () => {
    pbkdf2Sync("case-233", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt233=v233", "file233.txt", "--verbose"]);
    expect(parsed.flags["opt233"]).toBe("v233");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file233.txt"]);
  });
  it("case 234: --opt234=v234 with positional file234.txt", () => {
    pbkdf2Sync("case-234", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt234=v234", "file234.txt", "--verbose"]);
    expect(parsed.flags["opt234"]).toBe("v234");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file234.txt"]);
  });
  it("case 235: --opt235=v235 with positional file235.txt", () => {
    pbkdf2Sync("case-235", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt235=v235", "file235.txt", "--verbose"]);
    expect(parsed.flags["opt235"]).toBe("v235");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file235.txt"]);
  });
  it("case 236: --opt236=v236 with positional file236.txt", () => {
    pbkdf2Sync("case-236", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt236=v236", "file236.txt", "--verbose"]);
    expect(parsed.flags["opt236"]).toBe("v236");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file236.txt"]);
  });
  it("case 237: --opt237=v237 with positional file237.txt", () => {
    pbkdf2Sync("case-237", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt237=v237", "file237.txt", "--verbose"]);
    expect(parsed.flags["opt237"]).toBe("v237");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file237.txt"]);
  });
  it("case 238: --opt238=v238 with positional file238.txt", () => {
    pbkdf2Sync("case-238", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt238=v238", "file238.txt", "--verbose"]);
    expect(parsed.flags["opt238"]).toBe("v238");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file238.txt"]);
  });
  it("case 239: --opt239=v239 with positional file239.txt", () => {
    pbkdf2Sync("case-239", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt239=v239", "file239.txt", "--verbose"]);
    expect(parsed.flags["opt239"]).toBe("v239");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file239.txt"]);
  });
  it("case 240: --opt240=v240 with positional file240.txt", () => {
    pbkdf2Sync("case-240", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt240=v240", "file240.txt", "--verbose"]);
    expect(parsed.flags["opt240"]).toBe("v240");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file240.txt"]);
  });
  it("case 241: --opt241=v241 with positional file241.txt", () => {
    pbkdf2Sync("case-241", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt241=v241", "file241.txt", "--verbose"]);
    expect(parsed.flags["opt241"]).toBe("v241");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file241.txt"]);
  });
  it("case 242: --opt242=v242 with positional file242.txt", () => {
    pbkdf2Sync("case-242", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt242=v242", "file242.txt", "--verbose"]);
    expect(parsed.flags["opt242"]).toBe("v242");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file242.txt"]);
  });
  it("case 243: --opt243=v243 with positional file243.txt", () => {
    pbkdf2Sync("case-243", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt243=v243", "file243.txt", "--verbose"]);
    expect(parsed.flags["opt243"]).toBe("v243");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file243.txt"]);
  });
  it("case 244: --opt244=v244 with positional file244.txt", () => {
    pbkdf2Sync("case-244", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt244=v244", "file244.txt", "--verbose"]);
    expect(parsed.flags["opt244"]).toBe("v244");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file244.txt"]);
  });
  it("case 245: --opt245=v245 with positional file245.txt", () => {
    pbkdf2Sync("case-245", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt245=v245", "file245.txt", "--verbose"]);
    expect(parsed.flags["opt245"]).toBe("v245");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file245.txt"]);
  });
  it("case 246: --opt246=v246 with positional file246.txt", () => {
    pbkdf2Sync("case-246", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt246=v246", "file246.txt", "--verbose"]);
    expect(parsed.flags["opt246"]).toBe("v246");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file246.txt"]);
  });
  it("case 247: --opt247=v247 with positional file247.txt", () => {
    pbkdf2Sync("case-247", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt247=v247", "file247.txt", "--verbose"]);
    expect(parsed.flags["opt247"]).toBe("v247");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file247.txt"]);
  });
  it("case 248: --opt248=v248 with positional file248.txt", () => {
    pbkdf2Sync("case-248", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt248=v248", "file248.txt", "--verbose"]);
    expect(parsed.flags["opt248"]).toBe("v248");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file248.txt"]);
  });
  it("case 249: --opt249=v249 with positional file249.txt", () => {
    pbkdf2Sync("case-249", "salt", 50000, 16, "sha256");
    const parsed = parseArgs(["--opt249=v249", "file249.txt", "--verbose"]);
    expect(parsed.flags["opt249"]).toBe("v249");
    expect(parsed.flags.verbose).toBe(true);
    expect(parsed.positional).toEqual(["file249.txt"]);
  });
});
