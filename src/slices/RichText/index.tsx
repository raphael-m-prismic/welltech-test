import { type FC } from "react";
import { type Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import {
  PrismicRichText,
  type SliceComponentProps,
  type JSXMapSerializer,
} from "@prismicio/react";
import Container from "@/components/Container/Container";
import styles from "./index.module.css";

const components: JSXMapSerializer = {
  hyperlink: ({ node, children }) => {
    return <PrismicNextLink field={node.data}>{children}</PrismicNextLink>;
  },
  label: ({ node, children }) => {
    if (node.data.label === "codespan") {
      return <code>{children}</code>;
    }
  },
};

/**
 * Props for `RichText`.
 */
type RichTextProps = SliceComponentProps<Content.RichTextSlice>;

/**
 * Component for "RichText" Slices.
 */
const RichText: FC<RichTextProps> = ({ slice, context }) => {
  console.log(context)
  return (
    <section >
      <Container>
        {/* <div className={context === "article" ? styles.test : ""}> */}
          <PrismicRichText field={slice.primary.content} components={{
            ...components,
            heading1: ({ children }) => <h2 className={context === "article" ? styles.test : ""}>{children}</h2>,
            heading2: ({ children }) => <h2 className={context === "article" ? styles.test : ""}>{children}</h2>,
            heading3: ({ children }) => <h2 className={context === "article" ? styles.test : ""}>{children}</h2>,
            paragraph: ({ children }) => <p className={context === "article" ? styles.test : ""}>{children}</p>
          }} />
      </Container>
    </section>
  );
};

export default RichText;
