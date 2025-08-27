import { NCALayerService } from "~/shared/libs/ncalayer/ncalayer";
import { NCA_EVENTS } from "~/shared/libs/ncalayer/types";
import type { Nullable } from "~/shared/types";

export const useNCALayer = () => {
  const ncaLayerClient = ref<Nullable<NCALayerService>>(new NCALayerService());

  const isServiceAvailable = computed(
    () => Boolean(ncaLayerClient.value) && import.meta.client,
  );

  const isConnected = ref(false);

  const signXML = async (content: string) => {
    if (!isServiceAvailable.value) return;
    return await ncaLayerClient.value!.signXML(content);
  };

  const signCMS = async (content: string) => {
    if (!isServiceAvailable.value) return;
    return await ncaLayerClient.value!.signCMS(content);
  };

  const checkInterval = useIntervalFn(async () => {
    if (!isServiceAvailable.value) return;

    ncaLayerClient.value?.checkConnected(true);
  }, 5000);

  const handleCheckConnected = async (_event: Event) => {
    const event = _event as CustomEvent<boolean>;
    isConnected.value = event.detail;

    if (!event.detail) {
      await ncaLayerClient.value!.reconnect();
    }
  };

  onMounted(async () => {
    if (!isServiceAvailable.value) return;

    ncaLayerClient.value!.addEventListener(
      NCA_EVENTS.checkConnected,
      handleCheckConnected,
    );
    await ncaLayerClient.value!.connect();
  });

  onBeforeUnmount(async () => {
    if (!isServiceAvailable.value) return;

    checkInterval.pause();
    await ncaLayerClient.value!.disconnect();
    ncaLayerClient.value!.removeEventListener(
      NCA_EVENTS.checkConnected,
      handleCheckConnected,
    );
    ncaLayerClient.value = null;
  });

  return {
    signXML,
    signCMS,
    isConnected,
  };
};
