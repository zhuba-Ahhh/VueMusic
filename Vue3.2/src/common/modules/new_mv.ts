import { reactive, onMounted } from "vue";
import { mv } from "@/apis/modules";
import { ElMessage } from "element-plus";
import type { mvType, paramsType } from "@/types";
import MV_AREA from "../index";

type mv_infoType = {
  mv_area: any;
  mv_list: mvType[];
  mv_index: number;
  mv_params: paramsType;
  mv_count: number;
  mv_loading: boolean;
};

export default function hot_recom() {
  // MV
  const mv_info: mv_infoType = reactive({
    mv_area: MV_AREA,
    mv_list: [],
    mv_index: 0,
    mv_params: { limit: 10 },
    mv_count: 10,
    mv_loading: true,
  });

  // 最新MV
  const getMv = async (params: { limit: number }) => {
    const { data: res } = await mv(params);

    if (res.code !== 200) {
      return ElMessage.error("数据请求失败");
    }

    mv_info["mv_list"] = res.data;
    mv_info["mv_loading"] = false;
  };

  // 切换MV类别
  const chooseMvType = (index: number) => {
    mv_info["mv_index"] = index;
    mv_info["mv_params"]["area"] = index !== 0 ? mv_info["mv_area"][index] : "";
    mv_info["mv_loading"] = true;
    getMv(mv_info["mv_params"]);
  };

  onMounted(() => {
    getMv(mv_info["mv_params"]);
  });

  return {
    mv_info,
    chooseMvType,
  };
}
