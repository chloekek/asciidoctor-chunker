/*
 * This file is a part of Asciidoctor Chunker project.
 * Copyright (c) 2021 Wataru Shito (@waterloo_jp)
 */

'use strict';

import { makeChunks, newDOM, printer } from './DOM.mjs';
import { makeConfig } from './CommandOptions.mjs';
import { exists } from './Files.mjs';
import { mkdirs } from './Files.mjs';


const sampleHTML = 'test/resources/output/single/sample.html';
const sampleConfig = {
  outdir: 'html_chunks',
  depth: {
    default: 1, // the default extracton is chapter level
    2: 4, // extracts subsubsections in chap2
    3: 2 // extracts sections in chap 3
  }
};

const defaultConfig = {
  outdir: 'html_chunks',
  depth: {
    default: 1, // the default extracton is chapter level
  }
};


const main = async (adocHtmlFile, config = defaultConfig) => {
  const { outdir } = config;
  if (!await exists(outdir)) await mkdirs(outdir);
  const writer = printer(outdir);
  const dom = newDOM(adocHtmlFile);
  makeChunks(writer, dom, config);
  console.log(`Successfully chunked! => ${outdir}/index.html\n`);
}

const { singleHTML, config } = makeConfig(process.argv, defaultConfig);

main(singleHTML, config);
