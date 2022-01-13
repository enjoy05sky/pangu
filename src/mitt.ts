import mitt from "mitt";

type Events = Record<string, string | Record<string, unknown>>;

export default mitt<Events>(); // inferred as Emitter<Events>
