export interface GuidanceStep {
  title: string;
  instruction: string;
  subInstruction: string;
}

export const GUIDANCE: Record<string, GuidanceStep[]> = {
  cardiac_arrest: [
    {
      title: 'Check Responsiveness',
      instruction: 'Tap shoulders and shout "Are you okay?"',
      subInstruction: 'If no response, immediately start CPR',
    },
    {
      title: 'Call for Help',
      instruction: 'Shout for someone to call 999/112 and get an AED',
      subInstruction: 'Do not leave the person alone',
    },
    {
      title: 'Position',
      instruction: 'Place person on firm, flat surface',
      subInstruction: 'Tilt head back slightly to open airway',
    },
    {
      title: '30 Compressions',
      instruction: 'Place heel of hand on centre of chest',
      subInstruction: 'Press hard at 100-120 compressions per minute',
    },
    {
      title: '2 Rescue Breaths',
      instruction: 'Open airway and give 2 gentle breaths',
      subInstruction: 'Watch for chest rising',
    },
    {
      title: 'Continue CPR',
      instruction: 'Repeat 30 compressions : 2 breaths',
      subInstruction: 'Continue until help arrives or person wakes',
    },
  ],
  epipen: [
    {
      title: 'Recognize Anaphylaxis',
      instruction: 'Look for: difficulty breathing, swelling, hives',
      subInstruction: 'Act immediately - do not wait',
    },
    {
      title: 'Get EpiPen',
      instruction: 'Remove EpiPen from carrier tube',
      subInstruction: 'Blue safety release to the sky, orange tip to thigh',
    },
    {
      title: 'Prepare Thigh',
      instruction: 'Remove pants/skirt if needed to access outer thigh',
      subInstruction: 'Can inject through thin clothing',
    },
    {
      title: 'Inject',
      instruction: 'Swing and push orange tip firmly into outer thigh',
      subInstruction: 'Hold in place for 3 seconds',
    },
    {
      title: 'Remove',
      instruction: 'Remove EpiPen and massage injection site for 10 seconds',
      subInstruction: 'Rub in circular motion',
    },
    {
      title: 'Recovery Position',
      instruction: 'Place person on side, head tilted back',
      subInstruction: 'Call 999/112. Seek medical help immediately',
    },
  ],
  narcan: [
    {
      title: 'Recognize Overdose',
      instruction: 'Look for: blue lips, unconsciousness, slow breathing',
      subInstruction: 'Act immediately',
    },
    {
      title: 'Get Narcan',
      instruction: 'Remove nasal spray from package',
      subInstruction: 'Ready to administer',
    },
    {
      title: 'Position Head',
      instruction: 'Tilt head back slightly',
      subInstruction: 'Keep airway clear',
    },
    {
      title: 'Administer',
      instruction: 'Insert nozzle into nostril and press plunger firmly',
      subInstruction: 'Deliver full dose into nose',
    },
    {
      title: 'Recovery Position',
      instruction: 'Place person on side if unresponsive',
      subInstruction: 'Call 999/112 immediately',
    },
    {
      title: 'Watch & Wait',
      instruction: 'Monitor breathing for 2-3 minutes',
      subInstruction: 'If no improvement, administer second dose',
    },
  ],
  choking: [
    {
      title: 'Identify Choking',
      instruction: 'Cannot cough, speak, or breathe',
      subInstruction: 'Act immediately',
    },
    {
      title: 'Five Back Blows',
      instruction: 'Stand behind person, give 5 firm blows between shoulder blades',
      subInstruction: 'Use heel of hand',
    },
    {
      title: 'Check Mouth',
      instruction: 'Look in mouth for object',
      subInstruction: 'Remove if visible',
    },
    {
      title: 'Heimlich Manoeuvre',
      instruction: 'Stand behind, fist above navel',
      subInstruction: 'Push inward and upward with quick, hard thrusts',
    },
    {
      title: 'Repeat',
      instruction: 'Alternate 5 back blows + 5 Heimlich thrusts',
      subInstruction: 'Continue until object dislodges or person can cough',
    },
    {
      title: 'Seek Help',
      instruction: 'Call 999/112 if choking persists',
      subInstruction: 'Monitor person closely',
    },
  ],
};
