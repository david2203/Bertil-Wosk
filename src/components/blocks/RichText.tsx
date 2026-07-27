import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { urlForImage, imageDimensions } from "@/lib/sanity.image";

type InlineImage = {
  alt?: string;
  caption?: string;
  asset?: { _ref?: string };
};

const components: PortableTextComponents = {
  types: {
    // Images inserted into the rich-text editor. Without this renderer
    // Portable Text has no handler for `_type: "image"` and drops them.
    image: ({ value }: { value: InlineImage }) => {
      if (!value?.asset?._ref) return null;
      const dims = imageDimensions(value);
      const width = dims?.width ?? 1400;
      const height = dims?.height ?? 933;

      return (
        <figure className="mt-8">
          <Image
            src={urlForImage(value).width(1400).fit("max").auto("format").url()}
            alt={value.alt ?? ""}
            width={width}
            height={height}
            sizes="(min-width: 768px) 672px, 100vw"
            className="h-auto w-full rounded bg-soft"
          />
          {value.caption ? (
            <figcaption className="mt-2 text-sm text-muted">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
  block: {
    // `whitespace-pre-line` keeps soft line breaks (Shift+Enter, stored as \n
    // inside the span) while still collapsing incidental whitespace. Without
    // it those newlines render as ordinary spaces.
    normal: ({ children }) => (
      <p className="mt-4 whitespace-pre-line text-ink/90">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 whitespace-pre-line text-2xl">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 whitespace-pre-line text-xl">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 whitespace-pre-line border-l-2 border-gold pl-4 font-serif italic text-ink">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-4 list-disc pl-6">{children}</ul>,
    number: ({ children }) => <ol className="mt-4 list-decimal pl-6">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href ?? "";
      const external = /^https?:\/\//i.test(href);
      return (
        <a
          href={href}
          className="text-petrol underline"
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
};

export function RichText({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) return null;
  return (
    <div className="max-w-2xl leading-relaxed">
      <PortableText value={value} components={components} />
    </div>
  );
}
