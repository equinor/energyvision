import type { FieldProps } from 'sanity';

export const RequiredField = (required: boolean) =>
  function RequiredFieldComponent(props: FieldProps) {
    if (!required || !props.title) return props.renderDefault(props);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* <label
          htmlFor={props.inputId}
          style={{ fontSize: '0.8125rem', fontWeight: 600, lineHeight: 1.25 }}
        >
          {props.title}
          <span
            aria-hidden="true"
            style={{ color: 'var(--card-badge-critical-fg-color)' }}
          >
            {' *'}
          </span>
          <span
            style={{
              position: 'absolute',
              width: 1,
              height: 1,
              overflow: 'hidden',
              clipPath: 'inset(50%)',
              whiteSpace: 'nowrap',
            }}
          >
            {' (required)'}
          </span>
        </label> */}
        {props.renderDefault({ ...props, title: `${props.title}*` })}
      </div>
    );
  };
