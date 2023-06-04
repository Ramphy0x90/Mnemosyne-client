import {
  trigger,
  transition,
  query,
  style,
  animate,
  group,
} from '@angular/animations';

export const RouteTransitionAnimations = trigger('fadeTransition', [
  transition('* <=> *', [
    /**
     * What happen to the elements that will be in the transition
     */
    query(
      ':enter, :leave',
      style({ width: '100%', height: '100%', zIndex: 2 }),
      { optional: true }
    ),
    group([
      // Element that will be displayed
      query(
        ':enter',
        [
          style({ opacity: '0', height: '100vh' }),
          animate('0.2s linear', style({ opacity: '1' })),
        ],
        { optional: true }
      ),
      // Old element that will be removed fro screen
      query(
        ':leave',
        [
          style({ opacity: '1', position: 'absolute' }),
          animate('0.1s linear', style({ opacity: '0' })),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);
