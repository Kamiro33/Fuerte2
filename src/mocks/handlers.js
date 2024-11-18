import { rest } from 'msw';  // Asegúrate de que rest esté correctamente importado

export const handlers = [
  // Simulación de los endpoints de ejercicios y rutinas
  rest.get('/workouts', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          exercise: { id: 1, name: 'Sentadillas', type: 'fuerza' },
          reps: 10,
          sets: 3,
          weight: 60,
          duration: null,
          date: '2024-11-14'
        },
        {
          id: 2,
          exercise: { id: 2, name: 'Correr', type: 'cardio' },
          reps: null,
          sets: null,
          weight: null,
          duration: 30,
          date: '2024-11-14'
        }
      ])
    );
  }),

  rest.post('/workouts', (req, res, ctx) => {
    const newWorkout = {
      id: Math.floor(Math.random() * 1000),
      ...req.body
    };
    return res(ctx.json(newWorkout));
  }),

  rest.delete('/workouts/:id', (req, res, ctx) => {
    return res(ctx.json({ message: 'Workout deleted successfully!' }));
  }),

  rest.get('/workout-schedule', (req, res, ctx) => {
    return res(
      ctx.json({
        schedule: {
          lunes: [{ exerciseId: 1, name: 'Sentadillas', type: 'fuerza' }],
          martes: [{ exerciseId: 2, name: 'Correr', type: 'cardio' }],
          miercoles: [],
          jueves: [],
          viernes: [],
          sabado: [],
          domingo: []
        }
      })
    );
  })
];