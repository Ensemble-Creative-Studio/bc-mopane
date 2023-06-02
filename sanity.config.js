
import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./schemas"
import {apiVersion, dataset, projectId} from './sanity/env'
import {withDocumentI18nPlugin, getDocumentList} from '@sanity/document-internationalization'

import {schema} from './sanity/schema'
// Define the actions that should be available for singleton documents
const singletonActions = new Set(["publish", "discardChanges", "restore"])

// Define the singleton document types
const singletonTypes = new Set(["header"])

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,

  plugins:withDocumentI18nPlugin( [
    deskTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
            .title("Overlay")
            .id("overlay")
            .child(
              // Instead of rendering a list of documents, we render a single
              // document, specifying the `documentId` manually to ensure
              // that we're editing the single instance of the document
              S.document()
                .schemaType("overlay")
                .documentId("overlay")
            ),
       S.divider(),
            // Our singleton type has a list item with a custom child
            S.listItem()
              .title("Header")
              .id("header-info")
              .child(
                // Instead of rendering a list of documents, we render a single
                // document, specifying the `documentId` manually to ensure
                // that we're editing the single instance of the document
                S.document()
                  .schemaType("header-info")
                  .documentId("header-info")
              ),
              S.listItem()
              .title("Hero")
              .id("hero")
              .child(
                // Instead of rendering a list of documents, we render a single
                // document, specifying the `documentId` manually to ensure
                // that we're editing the single instance of the document
                S.document()
                  .schemaType("hero")
                  .documentId("hero")
              ),
              S.listItem()
              .title("Edition Limité")
              .id("editionLimite")
              .child(
                // Instead of rendering a list of documents, we render a single
                // document, specifying the `documentId` manually to ensure
                // that we're editing the single instance of the document
                S.document()
                  .schemaType("editionLimite")
                  .documentId("editionLimite")
              ),
              S.listItem()
              .title("Le bois")
              .id("bois")
              .child(
                // Instead of rendering a list of documents, we render a single
                // document, specifying the `documentId` manually to ensure
                // that we're editing the single instance of the document
                S.document()
                  .schemaType("bois")
                  .documentId("bois")
              ),
              S.listItem()
              .title("Le son")
              .id("son")
              .child(
                // Instead of rendering a list of documents, we render a single
                // document, specifying the `documentId` manually to ensure
                // that we're editing the single instance of the document
                S.document()
                  .schemaType("son")
                  .documentId("son")
              ),
              S.listItem()
              .title("Video 360")
              .id("video360")
              .child(
                // Instead of rendering a list of documents, we render a single
                // document, specifying the `documentId` manually to ensure
                // that we're editing the single instance of the document
                S.document()
                  .schemaType("video360")
                  .documentId("video360")
              ),
              S.listItem()
              .title("Nuances")
              .id("nuances")
              .child(
                // Instead of rendering a list of documents, we render a single
                // document, specifying the `documentId` manually to ensure
                // that we're editing the single instance of the document
                S.document()
                  .schemaType("nuances")
                  .documentId("nuances")
              ),
              S.listItem()
              .title("Spécification techniques")
              .id("specification")
              .child(
                // Instead of rendering a list of documents, we render a single
                // document, specifying the `documentId` manually to ensure
                // that we're editing the single instance of the document
                S.document()
                  .schemaType("specification")
                  .documentId("specification")
              ),
              S.listItem()
              .title("Pédigré")
              .id("pedigre")
              .child(
                // Instead of rendering a list of documents, we render a single
                // document, specifying the `documentId` manually to ensure
                // that we're editing the single instance of the document
                S.document()
                  .schemaType("pedigre")
                  .documentId("pedigre")
              ),
              S.listItem()
              .title("Showroom")
              .id("showroom")
              .child(
                // Instead of rendering a list of documents, we render a single
                // document, specifying the `documentId` manually to ensure
                // that we're editing the single instance of the document
                S.document()
                  .schemaType("showroom")
                  .documentId("showroom")
              ),
              S.listItem()
              .title("Footer")
              .id("footer")
              .child(
                // Instead of rendering a list of documents, we render a single
                // document, specifying the `documentId` manually to ensure
                // that we're editing the single instance of the document
                S.document()
                  .schemaType("footer")
                  .documentId("footer")
              ),
              S.divider(),
            // Regular document types
            S.documentTypeListItem("pageFooter").title("Pages légales"),
            // S.documentTypeListItem("author").title("Authors"),
          ]),
    }),
    visionTool(),
  ], {
    // .. your i18n config, example:
    languages: ['fr', 'en','de','ja'],
  }),

  schema: {
    types: schemaTypes,

    // Filter out singleton types from the global “New document” menu options
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
})
