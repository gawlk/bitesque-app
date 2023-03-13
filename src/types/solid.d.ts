declare namespace Solid {
  export type Accessor<T> = import('solid-js').Accessor<T>

  export type Component<T = {}> = import('solid-js').Component<T>

  export type ValidComponent = import('solid-js').ValidComponent

  export type ParentProps = import('solid-js').ParentProps

  namespace JSX {
    export type Element = import('solid-js').JSXElement

    export type EventHandlerUnion<T, K> =
      import('solid-js').JSX.EventHandlerUnion<T, K>

    export type CSSProperties = import('solid-js').JSX.CSSProperties

    export type HTMLAttributes<T = any> =
      import('solid-js').JSX.HTMLAttributes<T>
    export type ButtonHTMLAttributes =
      import('solid-js').JSX.ButtonHTMLAttributes<HTMLButtonElement>
    export type InputHTMLAttributes =
      import('solid-js').JSX.InputHTMLAttributes<HTMLInputElement>
    export type SelectHTMLAttributes =
      import('solid-js').JSX.SelectHTMLAttributes<HTMLSelectElement>
    export type DetailsHTMLAttributes =
      import('solid-js').JSX.DetailsHtmlAttributes<HTMLDetailsElement>
    export type DialogHTMLAttributes =
      import('solid-js').JSX.DialogHtmlAttributes<HTMLDialogElement>
  }

  namespace Store {
    export type DeepReadonly<T> = import('solid-js/store').DeepReadonly<T>
  }

  namespace Router {
    export type LinkProps = import('@solidjs/router').LinkProps
    export type RouteDefinition = import('@solidjs/router').RouteDefinition
  }
}
